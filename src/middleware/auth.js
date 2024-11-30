import { AuthService } from '../lib/auth/authService';

export async function authMiddleware(context) {
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.split(' ')[1];
  const user = AuthService.verifyToken(token);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Adiciona o usuário ao contexto para uso nas rotas
  context.user = user;
  return null; // Continua para a próxima função
}

export function requirePermission(permission) {
  return async (context) => {
    const user = context.user;
    if (!AuthService.checkPermission(user, permission)) {
      return new Response(JSON.stringify({ 
        error: 'Forbidden',
        requiredPermission: permission
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return null;
  };
}
