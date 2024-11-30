import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = import.meta.env.JWT_SECRET;
const TOKEN_EXPIRY = '7d'; // 7 dias
const REFRESH_TOKEN_EXPIRY = '30d'; // 30 dias

export class AuthService {
  static generateTokens(user) {
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      points: user.points || 0,
      permissions: user.permissions || {}
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
      return null;
    }
  }

  static async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET);
      const { accessToken } = this.generateTokens(decoded);
      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Verifica se o usuário tem permissão baseado em pontos
  static checkPermission(user, permission) {
    if (!user?.permissions) return false;
    
    const userPermission = user.permissions[permission];
    if (!userPermission) return false;

    return userPermission.hasPermission && user.points >= userPermission.pointsNeeded;
  }
}
