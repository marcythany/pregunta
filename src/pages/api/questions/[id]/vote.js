import { authMiddleware } from '@middleware/auth';
import DbService from '@lib/db/dbService';
import { ObjectId } from 'mongodb';

// POST: Votar em uma pergunta (upvote/downvote)
export async function POST({ request, params }) {
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

    const { voteType } = await request.json();
    if (!['up', 'down'].includes(voteType)) {
      return new Response(
        JSON.stringify({ message: 'Tipo de voto inválido' }),
        { status: 400 }
      );
    }

    const dbService = new DbService();
    await dbService.connect();
    const questionsCollection = dbService.collection('questions');
    const votesCollection = dbService.collection('votes');

    // Verifica se o usuário já votou nesta pergunta
    const existingVote = await votesCollection.findOne({
      questionId: id,
      userId: auth.userId
    });

    const voteValue = voteType === 'up' ? 1 : -1;

    if (existingVote) {
      // Se o voto é do mesmo tipo, remove o voto
      if (existingVote.value === voteValue) {
        await votesCollection.deleteOne({ _id: existingVote._id });
        await questionsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { votes: -voteValue } }
        );

        return new Response(
          JSON.stringify({ message: 'Voto removido com sucesso' }),
          { status: 200 }
        );
      } 
      // Se o voto é diferente, atualiza o voto
      else {
        await votesCollection.updateOne(
          { _id: existingVote._id },
          { $set: { value: voteValue } }
        );
        await questionsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { votes: voteValue * 2 } } // Multiplica por 2 pois estamos mudando a direção do voto
        );
      }
    } 
    // Se não existe voto, cria um novo
    else {
      await votesCollection.insertOne({
        questionId: id,
        userId: auth.userId,
        value: voteValue,
        createdAt: new Date()
      });
      await questionsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { votes: voteValue } }
      );
    }

    // Busca o total atualizado de votos
    const question = await questionsCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { votes: 1 } }
    );

    return new Response(
      JSON.stringify({
        message: 'Voto registrado com sucesso',
        totalVotes: question.votes
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar voto:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
