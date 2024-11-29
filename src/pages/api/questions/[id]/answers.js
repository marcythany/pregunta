import { authMiddleware } from '../../../../utils/auth';
import { connectToDb } from '../../../../utils/db';
import { ObjectId } from 'mongodb';

// GET: Listar respostas de uma pergunta
export async function GET({ request, params }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: 'ID de pergunta inválido' }),
        { status: 400 }
      );
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const sort = url.searchParams.get('sort') || 'votes'; // votes ou date

    await connectToDb();
    const db = await connectToDb();
    const answersCollection = db.collection('answers');

    // Construir query
    const query = { questionId: id };

    // Definir ordenação
    const sortOptions = sort === 'votes' 
      ? { votes: -1, createdAt: -1 }
      : { createdAt: -1 };

    // Buscar respostas com paginação
    const answers = await answersCollection
      .find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Contar total de respostas
    const total = await answersCollection.countDocuments(query);

    return new Response(
      JSON.stringify({
        answers,
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
    console.error('Erro ao listar respostas:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// POST: Adicionar uma resposta
export async function POST({ request, params }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    const { id: questionId } = params;
    if (!ObjectId.isValid(questionId)) {
      return new Response(
        JSON.stringify({ message: 'ID de pergunta inválido' }),
        { status: 400 }
      );
    }

    const { content } = await request.json();
    if (!content) {
      return new Response(
        JSON.stringify({ message: 'Conteúdo da resposta é obrigatório' }),
        { status: 400 }
      );
    }

    await connectToDb();
    const db = await connectToDb();
    const answersCollection = db.collection('answers');
    const questionsCollection = db.collection('questions');

    // Verifica se a pergunta existe
    const question = await questionsCollection.findOne({ 
      _id: new ObjectId(questionId)
    });
    if (!question) {
      return new Response(
        JSON.stringify({ message: 'Pergunta não encontrada' }),
        { status: 404 }
      );
    }

    // Cria a nova resposta
    const newAnswer = {
      questionId,
      content,
      userId: auth.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      votes: 0,
      accepted: false
    };

    const result = await answersCollection.insertOne(newAnswer);

    // Atualiza o contador de respostas na pergunta
    await questionsCollection.updateOne(
      { _id: new ObjectId(questionId) },
      { $inc: { answerCount: 1 } }
    );

    return new Response(
      JSON.stringify({
        message: 'Resposta adicionada com sucesso',
        answerId: result.insertedId
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao adicionar resposta:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
