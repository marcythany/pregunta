import { connectToDb } from '../../../utils/db';
import bcrypt from 'bcryptjs';
import { User } from '../../../models/user';

export async function POST({ request }) {
  try {
    const { name, email, password } = await request.json();

    // Validação básica
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Todos os campos são obrigatórios' }),
        { status: 400 }
      );
    }

    await connectToDb();

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Email já está em uso' }),
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar novo usuário
    const user = new User({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    await user.save();

    return new Response(
      JSON.stringify({
        message: 'Usuário criado com sucesso',
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro no registro:', error);
    return new Response(
      JSON.stringify({ message: 'Erro interno do servidor' }),
      { status: 500 }
    );
  }
}
