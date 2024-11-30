import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userStore, logout } from '@stores/authStore';
import { AuthModal } from '@features/auth/AuthModal';
import ApiService from '@lib/api/apiService';

export function HeaderAuth({ lang = 'pt-br' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const user = useStore(userStore);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await ApiService.get('auth/me');
        userStore.set({ isAuthenticated: true, user: userData });
      } catch (error) {
        // Não mostrar erro 401 pois é esperado quando não está autenticado
        if (error.status !== 401) {
          console.error('Erro na verificação de autenticação:', error);
        }
        userStore.set({ isAuthenticated: false, user: null });
      }
    };

    // Verificar autenticação apenas se houver um token
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    } else {
      userStore.set({ isAuthenticated: false, user: null });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) 
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await ApiService.post('auth/logout');
      userStore.set({ isAuthenticated: false, user: null });
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="relative flex items-center gap-4">
      {!user.isAuthenticated ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-light-text-primary hover:bg-light-primary/10 dark:text-dark-text-primary dark:hover:bg-dark-primary/10 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
        >
          {lang === 'pt-br' ? 'Entrar' : 'Login'}
        </button>
      ) : (
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setIsMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-light-text-primary hover:bg-light-primary/10 dark:text-dark-text-primary dark:hover:bg-dark-primary/10 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          >
            <span className="sr-only">{lang === 'pt-br' ? 'Abrir menu do usuário' : 'Open user menu'}</span>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                  {user.user?.points || 0} pts
                </span>
                <span className="text-light-text-secondary dark:text-dark-text-secondary">•</span>
                <span>{user.user?.username || (lang === 'pt-br' ? 'Usuário' : 'User')}</span>
              </div>
              {user.user?.avatarUrl ? (
                <img 
                  src={user.user.avatarUrl} 
                  alt={user.user.username} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center">
                  <span className="text-light-primary dark:text-dark-primary">
                    {user.user?.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-light-surface dark:bg-dark-surface shadow-lg ring-1 ring-light-primary/5 dark:ring-dark-primary/5 focus:outline-none"
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <div className="py-2">
                <div className="px-4 py-2 border-b border-light-primary/5 dark:border-dark-primary/5">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {user.user?.username}
                    </p>
                    <span className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary">
                      {user.user?.points || 0} pts
                    </span>
                  </div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary truncate">
                    {user.user?.email}
                  </p>
                </div>

                <a
                  href="/profile"
                  className="block w-full px-4 py-2 text-left text-sm text-light-text-primary hover:bg-light-primary/5 dark:text-dark-text-primary dark:hover:bg-dark-primary/5"
                >
                  {lang === 'pt-br' ? 'Perfil' : 'Profile'}
                </a>

                <a
                  href="/settings"
                  className="block w-full px-4 py-2 text-left text-sm text-light-text-primary hover:bg-light-primary/5 dark:text-dark-text-primary dark:hover:bg-dark-primary/5"
                >
                  {lang === 'pt-br' ? 'Configurações' : 'Settings'}
                </a>

                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-light-text-primary hover:bg-light-primary/5 dark:text-dark-text-primary dark:hover:bg-dark-primary/5"
                >
                  {lang === 'pt-br' ? 'Sair' : 'Logout'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
