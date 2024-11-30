import { AuthService } from '@/lib/auth/authService';

export const authMiddleware = AuthService.authMiddleware.bind(AuthService);

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
