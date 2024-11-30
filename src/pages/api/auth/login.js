import DbService from '@/lib/db/dbService';
import { User } from '@/models/user';
import { AuthService } from '@/lib/auth/authService';

export async function post({ request }) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email e senha são obrigatórios' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    await DbService.connectToDb();

    // Buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Email ou senha inválidos' }),
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Verificar senha
    const isValidPassword = await AuthService.comparePasswords(password, user.password);
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ message: 'Email ou senha inválidos' }),
        { 
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Gerar tokens
    const { accessToken, refreshToken } = await AuthService.generateTokens(user);

    // Configurar cookie do refresh token
    const cookieOptions = {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 dias
    };

    return new Response(
      JSON.stringify({
        message: 'Login realizado com sucesso',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          points: user.points
        },
        accessToken
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `refreshToken=${refreshToken}; ${Object.entries(cookieOptions)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')}`
        }
      }
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
