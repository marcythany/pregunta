import { AuthService } from '@/lib/auth/authService';
import DbService from '@/lib/db/dbService';
import { ObjectId } from 'mongodb';

export const GET = async ({ request }) => {
  try {
    // Pegar o token do cookie
    const cookieHeader = request.headers.get('cookie');
    console.log('Cookie header:', cookieHeader);

    const cookies = cookieHeader?.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    console.log('Cookies parseados:', cookies);

    const refreshToken = cookies?.refreshToken;
    if (!refreshToken) {
      console.log('Refresh token não encontrado');
      return new Response(null, { status: 401 });
    }

    // Verificar o token
    const decoded = AuthService.verifyToken(refreshToken);
    console.log('Token decodificado:', decoded);

    if (!decoded) {
      console.log('Token inválido');
      return new Response(null, { status: 401 });
    }

    // Buscar usuário atualizado do banco
    const db = await DbService.getInstance();
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(decoded.id) },
      { projection: { password: 0 } }
    );

    console.log('Usuário encontrado:', user ? 'sim' : 'não');

    if (!user) {
      return new Response(null, { status: 401 });
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      points: user.points || 0,
      avatarUrl: user.avatarUrl,
      permissions: user.permissions || ['user']
    };

    console.log('Retornando dados do usuário:', userData);

    return new Response(
      JSON.stringify(userData),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    return new Response(
      JSON.stringify({ message: 'Erro ao verificar usuário' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
