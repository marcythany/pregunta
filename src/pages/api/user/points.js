import { authMiddleware } from '../../../utils/auth';
import DbService from '@/lib/db/dbService';
import { PERMISSION_THRESHOLDS } from '../../../utils/permissions';

// GET: Obter informações sobre pontos e permissões do usuário
export async function GET({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    // Conectar ao banco de dados
    const db = await DbService.getInstance();
    const usersCollection = db.collection('users');

    // Busca informações do usuário
    const user = await usersCollection.findOne(
      { _id: auth.userId },
      { projection: { points: 1, role: 1 } }
    );

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Usuário não encontrado' }),
        { status: 404 }
      );
    }

    // Calcula as permissões baseado nos pontos
    const permissions = Object.entries(PERMISSION_THRESHOLDS).reduce((acc, [action, threshold]) => {
      acc[action] = {
        hasPermission: user.role === 'admin' || (user.points || 0) >= threshold,
        requiredPoints: threshold,
        currentPoints: user.points || 0,
        pointsNeeded: Math.max(0, threshold - (user.points || 0))
      };
      return acc;
    }, {});

    return new Response(
      JSON.stringify({
        points: user.points || 0,
        role: user.role || 'user',
        permissions
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar pontos:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// GET: Obter histórico de pontos do usuário
export async function getPointsHistory({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;

    // Conectar ao banco de dados
    const db = await DbService.getInstance();
    const pointsHistoryCollection = db.collection('pointsHistory');

    // Busca o histórico de pontos com paginação
    const history = await pointsHistoryCollection
      .find({ userId: auth.userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Conta total de registros
    const total = await pointsHistoryCollection.countDocuments({ userId: auth.userId });

    return new Response(
      JSON.stringify({
        history,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao buscar histórico de pontos:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
