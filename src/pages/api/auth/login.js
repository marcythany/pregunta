import { connectToDb } from '../../../utils/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../../models/user';

export async function POST({ request }) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: 'Email e senha são obrigatórios' }),
        { status: 400 }
      );
    }

    await connectToDb();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Credenciais inválidas' }),
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ message: 'Credenciais inválidas' }),
        { status: 401 }
      );
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return new Response(
      JSON.stringify({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro no login:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
