import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = import.meta.env.JWT_SECRET;
const TOKEN_EXPIRY = '7d'; // 7 dias
const REFRESH_TOKEN_EXPIRY = '30d'; // 30 dias

export class AuthService {
  static generateTokens(user) {
    const payload = {
      id: user._id.toString(), // Garantir que o ID seja uma string
      email: user.email,
      username: user.username,
      points: user.points || 0,
      permissions: user.permissions || ['user']
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    return { accessToken, refreshToken };
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  static verifyAuthHeader(authHeader) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Token não fornecido');
    }
    const token = authHeader.split(' ')[1];
    return this.verifyToken(token);
  }

  static async authMiddleware(request) {
    try {
      const authHeader = request.headers.get('Authorization');
      const user = this.verifyAuthHeader(authHeader);
      return user;
    } catch (error) {
      return new Response(
        JSON.stringify({ message: error.message || 'Não autorizado' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  static async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET);
      const { accessToken } = this.generateTokens(decoded);
      return { accessToken };
    } catch (error) {
      throw new Error('Token de atualização inválido');
    }
  }

  static checkPermissionByPoints(points) {
    if (points >= 1000) return 'expert';
    if (points >= 500) return 'advanced';
    if (points >= 100) return 'intermediate';
    return 'beginner';
  }

  static checkPermission(user, permission) {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }
}
