import DbService from '@/lib/db/dbService';

// Pontuação mínima necessária para diferentes ações
export const PERMISSION_THRESHOLDS = {
  CREATE_QUESTION: 50,    // Pontos necessários para criar perguntas
  EDIT_QUESTION: 100,     // Pontos para editar perguntas de outros
  CREATE_ANSWER: 10,      // Pontos para responder
  VOTE: 20,              // Pontos para votar
  COMMENT: 30            // Pontos para comentar
};

// Pontos ganhos por diferentes ações
export const POINTS_REWARDS = {
  QUESTION_UPVOTED: 10,        // Quando sua pergunta recebe upvote
  ANSWER_UPVOTED: 10,         // Quando sua resposta recebe upvote
  ANSWER_ACCEPTED: 15,        // Quando sua resposta é aceita
  QUESTION_DOWNVOTED: -2,     // Quando sua pergunta recebe downvote
  ANSWER_DOWNVOTED: -2,       // Quando sua resposta recebe downvote
  FIRST_QUESTION: 10,         // Bônus pela primeira pergunta
  FIRST_ANSWER: 10           // Bônus pela primeira resposta
};

// Verifica se o usuário tem pontuação suficiente para uma ação específica
export async function checkPermission(userId, action) {
  try {
    const db = await DbService.getInstance();
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne(
      { _id: userId },
      { projection: { points: 1, role: 1 } }
    );

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Administradores sempre têm permissão
    if (user.role === 'admin') {
      return true;
    }

    // Verifica se o usuário tem pontos suficientes
    const requiredPoints = PERMISSION_THRESHOLDS[action];
    return (user.points || 0) >= requiredPoints;
  } catch (error) {
    console.error(`Erro ao verificar permissão para ${action}:`, error);
    throw error;
  }
}

// Atualiza a pontuação do usuário
export async function updateUserPoints(userId, action) {
  try {
    const db = await DbService.getInstance();
    const usersCollection = db.collection('users');

    const pointsToAdd = POINTS_REWARDS[action] || 0;
    
    await usersCollection.updateOne(
      { _id: userId },
      { 
        $inc: { points: pointsToAdd },
        $currentDate: { lastUpdated: true }
      }
    );

    // Retorna a pontuação atualizada
    const updatedUser = await usersCollection.findOne(
      { _id: userId },
      { projection: { points: 1 } }
    );

    return updatedUser.points;
  } catch (error) {
    console.error(`Erro ao atualizar pontos para ${action}:`, error);
    throw error;
  }
}

// Middleware para verificar permissões
export async function permissionMiddleware(request, action) {
  try {
    const auth = request.auth; // Assumindo que o auth middleware já foi executado
    
    if (!auth || !auth.userId) {
      return new Response(
        JSON.stringify({ message: 'Não autorizado' }),
        { status: 401 }
      );
    }

    const hasPermission = await checkPermission(auth.userId, action);
    
    if (!hasPermission) {
      const threshold = PERMISSION_THRESHOLDS[action];
      return new Response(
        JSON.stringify({ 
          message: `Você precisa de ${threshold} pontos para realizar esta ação`,
          requiredPoints: threshold
        }),
        { status: 403 }
      );
    }

    return null; // Retorna null se tudo estiver ok
  } catch (error) {
    console.error('Erro no middleware de permissão:', error);
    return new Response(
      JSON.stringify({ message: 'Erro ao verificar permissões' }),
      { status: 500 }
    );
  }
}
