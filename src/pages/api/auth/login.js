import { connectToDb } from '../../../utils/db';
import { AuthService } from '../../../lib/auth/authService';
import { User } from '../../../models/user';

export async function POST({ request }) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return new Response(
        JSON.stringify({ 
          error: 'Validation Error',
          message: 'Email e senha são obrigatórios' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    await connectToDb();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ 
          error: 'Auth Error',
          message: 'Credenciais inválidas' 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const isValidPassword = await AuthService.comparePasswords(password, user.password);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ 
          error: 'Auth Error',
          message: 'Credenciais inválidas' 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Gerar tokens
    const { accessToken, refreshToken } = AuthService.generateTokens(user);

    // Atualizar refresh token no banco
    await User.updateOne(
      { _id: user._id },
      { $set: { refreshToken } }
    );

    // Configurar cookie seguro para o refresh token
    const cookieOptions = {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 dias
    };

    return new Response(
      JSON.stringify({
        accessToken,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          points: user.points || 0,
          permissions: user.permissions || {}
        }
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
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Server Error',
        message: 'Erro ao processar login' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
