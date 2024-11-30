import { authMiddleware } from '@middleware/auth';
import DbService from '@lib/db/dbService';
import { User } from '@models/user';

// GET: Obter perfil do usuário
export async function GET({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth; // Retorna erro se não autenticado
    
    // Conectar ao banco de dados
    const db = await DbService.getInstance();
    const user = await User.findOne({ _id: auth.userId });
    
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Usuário não encontrado' }),
        { status: 404 }
      );
    }

    // Retorna dados do usuário excluindo informações sensíveis
    const { password, ...userWithoutPassword } = user;
    return new Response(JSON.stringify(userWithoutPassword), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// PUT: Atualizar perfil do usuário
export async function PUT({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    const updateData = await request.json();
    const allowedUpdates = ['name', 'email', 'avatar', 'bio'];
    
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

    // Conectar ao banco de dados
    const db = await DbService.getInstance();
    
    // Verifica se o email já está em uso (se estiver sendo atualizado)
    if (filteredData.email) {
      const existingUser = await User.findOne({ 
        email: filteredData.email,
        _id: { $ne: auth.userId }
      });
      
      if (existingUser) {
        return new Response(
          JSON.stringify({ message: 'Email já está em uso' }),
          { status: 400 }
        );
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: auth.userId },
      { $set: filteredData },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ message: 'Usuário não encontrado' }),
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return new Response(
      JSON.stringify({
        message: 'Perfil atualizado com sucesso',
        user: userWithoutPassword
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
