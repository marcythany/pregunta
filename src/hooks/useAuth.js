import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userStore, setUser, setToken } from '@/stores/authStore';

const API_URL = import.meta.env.PUBLIC_API_URL;

export function useAuth() {
  const user = useStore(userStore);

  useEffect(() => {
    // Verificar token expirado e tentar renovar
    const checkTokenExpiration = async () => {
      const token = user.token;
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // Converter para milissegundos
        
        // Se o token expira em menos de 5 minutos, tentar renovar
        if (Date.now() >= expirationTime - 5 * 60 * 1000) {
          await refreshToken();
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60 * 1000); // Verificar a cada minuto
    return () => clearInterval(intervalId);
  }, [user.token]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Necessário para cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      setToken(data.accessToken);
      setUser(data.user);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      setToken(data.accessToken);

      return data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Se falhar em renovar o token, fazer logout
      logout();
      throw error;
    }
  };

  const checkPermission = (permission) => {
    if (!user.isAuthenticated) return false;
    
    const userPermission = user.permissions?.[permission];
    if (!userPermission) return false;

    return userPermission.hasPermission && user.points >= userPermission.pointsNeeded;
  };

  return {
    user,
    login,
    logout,
    refreshToken,
    checkPermission,
    isAuthenticated: !!user.token
  };
}
