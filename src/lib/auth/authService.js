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
      return null;
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
}
