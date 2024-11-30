import DbService from '@/lib/db/dbService';
import { User } from '@/models/user';
import { AuthService } from '@/lib/auth/authService';

export async function post({ request }) {
  try {
    const { username, email, password } = await request.json();

    // Validação básica
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Todos os campos são obrigatórios' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Conectar ao banco de dados
    const db = await DbService.getInstance();

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      const field = existingUser.email === email ? 'Email' : 'Nome de usuário';
      return new Response(
        JSON.stringify({ message: `${field} já está em uso` }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // Hash da senha usando AuthService
    const hashedPassword = await AuthService.hashPassword(password);

    // Criar novo usuário com username e pontos iniciais
    const user = new User({
      username,
      email,
      password: hashedPassword,
      points: 0,
      permissions: User.getDefaultPermissions(),
      createdAt: new Date()
    });

    await user.save();

    // Gerar tokens usando AuthService
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
        message: 'Usuário criado com sucesso',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          points: user.points
        },
        accessToken
      }),
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `refreshToken=${refreshToken}; ${Object.entries(cookieOptions)
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')}`
        }
      }
    );
  } catch (error) {
    console.error('Erro no registro:', error);
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
