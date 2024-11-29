import { authMiddleware } from '../../../utils/auth';
import { connectToDb } from '../../../utils/db';
import { User } from '../../../models/user';
import bcrypt from 'bcryptjs';

// GET: Obter configurações do usuário
export async function GET({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    await connectToDb();
    const user = await User.findOne({ _id: auth.userId });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Usuário não encontrado' }),
        { status: 404 }
      );
    }

    // Retorna apenas as configurações públicas
    const settings = {
      notifications: user.notifications || {},
      preferences: user.preferences || {},
      language: user.language || 'pt-BR',
      theme: user.theme || 'light'
    };

    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// PUT: Atualizar configurações do usuário
export async function PUT({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    const updateData = await request.json();
    const allowedSettings = ['notifications', 'preferences', 'language', 'theme'];
    
    // Filtra apenas as configurações permitidas
    const filteredSettings = Object.keys(updateData)
      .filter(key => allowedSettings.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key];
        return obj;
      }, {});

    if (Object.keys(filteredSettings).length === 0) {
      return new Response(
        JSON.stringify({ message: 'Nenhuma configuração válida para atualização' }),
        { status: 400 }
      );
    }

    await connectToDb();
    const updatedUser = await User.findOneAndUpdate(
      { _id: auth.userId },
      { $set: filteredSettings },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ message: 'Usuário não encontrado' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Configurações atualizadas com sucesso',
        settings: filteredSettings
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}

// POST: Alterar senha
export async function POST({ request }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof Response) return auth;

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return new Response(
        JSON.stringify({ message: 'Senha atual e nova senha são obrigatórias' }),
        { status: 400 }
      );
    }

    await connectToDb();
    const user = await User.findOne({ _id: auth.userId });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Usuário não encontrado' }),
        { status: 404 }
      );
    }

    // Verifica se a senha atual está correta
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ message: 'Senha atual incorreta' }),
        { status: 401 }
      );
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Atualiza a senha
    await User.updateOne(
      { _id: auth.userId },
      { $set: { password: hashedPassword } }
    );

    return new Response(
      JSON.stringify({ message: 'Senha alterada com sucesso' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
