import jwt from 'jsonwebtoken';

export function verifyAuth(request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token não fornecido');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}

export async function authMiddleware(request) {
  try {
    const user = verifyAuth(request);
    return user;
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Não autorizado' }),
      { status: 401 }
    );
  }
}
