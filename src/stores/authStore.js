import { atom, map } from 'nanostores';

// Store para dados do usuário
export const userStore = map({
  isAuthenticated: false,
  user: null,
  points: 0,
  permissions: {}
});

// Store para token JWT
export const tokenStore = atom(null);

// Actions
export function setUser(userData) {
  userStore.setKey('user', userData);
  userStore.setKey('isAuthenticated', true);
}

export function setPoints(points) {
  userStore.setKey('points', points);
}

export function setPermissions(permissions) {
  userStore.setKey('permissions', permissions);
}

export function setToken(token) {
  tokenStore.set(token);
  // Opcionalmente salvar no localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function logout() {
  userStore.set({
    isAuthenticated: false,
    user: null,
    points: 0,
    permissions: {}
  });
  tokenStore.set(null);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

// Inicialização: recuperar token do localStorage
if (typeof window !== 'undefined') {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    setToken(savedToken);
  }
}
