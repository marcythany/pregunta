import { authMiddleware } from '../../../utils/auth';
import { connectToDb } from '../../../utils/db';
import { permissionMiddleware, updateUserPoints } from '../../../utils/permissions';

// GET: Listar perguntas (com paginação e filtros)
export async function GET({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const category = url.searchParams.get('category');
    const language = url.searchParams.get('language') || 'pt-br';
    const search = url.searchParams.get('search');

    await connectToDb();
    const db = await connectToDb();
    const questionsCollection = db.collection('questions');

    // Construir query baseada nos filtros
    const query = {
      language,
      ...(category && { category }),
      ...(search && { 
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } }
        ]
      })
    };

    // Executar query com paginação
    const questions = await questionsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Contar total de documentos para paginação
    const total = await questionsCollection.countDocuments(query);

    return new Response(
      JSON.stringify({
        questions,
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
    console.error('Erro ao listar perguntas:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// POST: Criar nova pergunta
export async function POST({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    // Verifica se o usuário tem permissão para criar perguntas
    request.auth = auth; // Passa o auth para o middleware de permissão
    const permissionCheck = await permissionMiddleware(request, 'CREATE_QUESTION');
    if (permissionCheck instanceof Response) return permissionCheck;

    const {
      title,
      content,
      category,
      language = 'pt-br',
      tags = []
    } = await request.json();

    // Validação básica
    if (!title || !content) {
      return new Response(
        JSON.stringify({ message: 'Título e conteúdo são obrigatórios' }),
        { status: 400 }
      );
    }

    await connectToDb();
    const db = await connectToDb();
    const questionsCollection = db.collection('questions');
    const usersCollection = db.collection('users');

    // Verifica se é a primeira pergunta do usuário
    const userQuestions = await questionsCollection.countDocuments({ userId: auth.userId });
    const isFirstQuestion = userQuestions === 0;

    const newQuestion = {
      title,
      content,
      category,
      language,
      tags,
      userId: auth.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      votes: 0,
      views: 0,
      answers: [],
      status: 'active'
    };

    const result = await questionsCollection.insertOne(newQuestion);

    // Atualiza pontos do usuário se for a primeira pergunta
    if (isFirstQuestion) {
      await updateUserPoints(auth.userId, 'FIRST_QUESTION');
    }

    // Busca a pontuação atualizada do usuário
    const user = await usersCollection.findOne(
      { _id: auth.userId },
      { projection: { points: 1 } }
    );

    return new Response(
      JSON.stringify({
        message: 'Pergunta criada com sucesso',
        questionId: result.insertedId,
        userPoints: user.points,
        firstQuestion: isFirstQuestion
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar pergunta:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
