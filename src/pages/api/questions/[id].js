import { authMiddleware } from '@/middleware/auth';
import DbService from '@/lib/db/dbService';
import { ObjectId } from 'mongodb';

// GET: Obter detalhes de uma pergunta específica
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

    const dbService = new DbService();
    await dbService.connect();
    const questionsCollection = dbService.getCollection('questions');

    // Incrementar visualizações
    await questionsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } }
    );

    const question = await questionsCollection.findOne({ _id: new ObjectId(id) });

    if (!question) {
      return new Response(
        JSON.stringify({ message: 'Pergunta não encontrada' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(question), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar pergunta:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// PUT: Atualizar uma pergunta
export async function PUT({ request, params }) {
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

    const updateData = await request.json();
    const allowedUpdates = ['title', 'content', 'category', 'tags', 'status'];
    
    // Filtra apenas os campos permitidos
    const filteredData = Object.keys(updateData)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    if (Object.keys(filteredData).length === 0) {
      return new Response(
        JSON.stringify({ message: 'Nenhum dado válido para atualização' }),
        { status: 400 }
      );
    }

    const dbService = new DbService();
    await dbService.connect();
    const questionsCollection = dbService.getCollection('questions');

    // Verifica se o usuário é o autor da pergunta
    const question = await questionsCollection.findOne({ _id: new ObjectId(id) });
    if (!question) {
      return new Response(
        JSON.stringify({ message: 'Pergunta não encontrada' }),
        { status: 404 }
      );
    }

    if (question.userId !== auth.userId) {
      return new Response(
        JSON.stringify({ message: 'Não autorizado a editar esta pergunta' }),
        { status: 403 }
      );
    }

    // Atualiza a pergunta
    const result = await questionsCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...filteredData,
          updatedAt: new Date()
        }
      }
    );

    return new Response(
      JSON.stringify({
        message: 'Pergunta atualizada com sucesso',
        updated: result.modifiedCount > 0
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar pergunta:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// DELETE: Remover uma pergunta
export async function DELETE({ request, params }) {
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

    const dbService = new DbService();
    await dbService.connect();
    const questionsCollection = dbService.getCollection('questions');

    // Verifica se o usuário é o autor da pergunta
    const question = await questionsCollection.findOne({ _id: new ObjectId(id) });
    if (!question) {
      return new Response(
        JSON.stringify({ message: 'Pergunta não encontrada' }),
        { status: 404 }
      );
    }

    if (question.userId !== auth.userId) {
      return new Response(
        JSON.stringify({ message: 'Não autorizado a deletar esta pergunta' }),
        { status: 403 }
      );
    }

    // Remove a pergunta
    await questionsCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(
      JSON.stringify({ message: 'Pergunta removida com sucesso' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao remover pergunta:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
