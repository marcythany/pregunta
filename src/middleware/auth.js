import { AuthService } from '@/lib/auth/authService';
import { PermissionService } from '@/lib/auth/permissionService';

export const authMiddleware = AuthService.authMiddleware.bind(AuthService);

export function requirePermission(action) {
  return async (request) => {
    return PermissionService.permissionMiddleware(request, action);
  };
}
