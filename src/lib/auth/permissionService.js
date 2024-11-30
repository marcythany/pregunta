import { DbService } from '@lib/db/dbService';
import { PERMISSION_THRESHOLDS } from '@constants/permissions';

export class PermissionService {
  static async checkPermission(userId, action) {
    try {
      const db = await DbService.getInstance();
      const usersCollection = db.collection('users');

      const user = await usersCollection.findOne(
        { _id: userId },
        { projection: { points: 1, role: 1 } }
      );

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Administradores sempre têm permissão
      if (user.role === 'admin') {
        return true;
      }

      // Verifica se o usuário tem pontos suficientes
      const requiredPoints = PERMISSION_THRESHOLDS[action];
      return (user.points || 0) >= requiredPoints;
    } catch (error) {
      console.error(`Erro ao verificar permissão para ${action}:`, error);
      throw error;
    }
  }

  static async permissionMiddleware(request, action) {
    try {
      const auth = request.auth;
      
      if (!auth || !auth.userId) {
        return new Response(
          JSON.stringify({ message: 'Não autorizado' }),
          { status: 401 }
        );
      }

      const hasPermission = await this.checkPermission(auth.userId, action);
      
      if (!hasPermission) {
        const threshold = PERMISSION_THRESHOLDS[action];
        return new Response(
          JSON.stringify({ 
            message: `Você precisa de ${threshold} pontos para realizar esta ação`,
            requiredPoints: threshold
          }),
          { status: 403 }
        );
      }

      return null; // Retorna null se tudo estiver ok
    } catch (error) {
      console.error('Erro no middleware de permissão:', error);
      return new Response(
        JSON.stringify({ message: 'Erro ao verificar permissões' }),
        { status: 500 }
      );
    }
  }

  static checkPermissionByPoints(points) {
    if (points >= 1000) return 'expert';
    if (points >= 500) return 'advanced';
    if (points >= 100) return 'intermediate';
    return 'beginner';
  }
}
