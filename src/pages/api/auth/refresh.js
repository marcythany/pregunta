import DbService from '@/lib/db/dbService';
import { AuthService } from '@/lib/auth/authService';
import { User } from '@/models/user';

export async function POST({ request }) {
  try {
    // Pegar o refresh token do cookie
    const cookies = request.headers.get('cookie')?.split(';')
      .reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});

    const refreshToken = cookies?.refreshToken;

    if (!refreshToken) {
      return new Response(
        JSON.stringify({ 
          error: 'Auth Error',
          message: 'Refresh token não encontrado' 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Conectar ao banco de dados
    const db = await DbService.getInstance();

    // Verificar se o refresh token existe no banco
    const user = await User.findOne({ refreshToken });

    if (!user) {
      return new Response(
        JSON.stringify({ 
          error: 'Auth Error',
          message: 'Token inválido' 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Gerar novo access token
    const { accessToken } = await AuthService.refreshAccessToken(refreshToken);

    return new Response(
      JSON.stringify({ accessToken }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Refresh token error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Server Error',
        message: 'Erro ao renovar token' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
