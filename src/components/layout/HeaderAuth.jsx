import { useState, useEffect, useRef } from 'react';

const dropdownStyles = `
  .dropdown-menu {
    display: none;
  }
  .dropdown-container:hover .dropdown-menu {
    display: block;
  }
`;

export default function HeaderAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          if (response.status !== 401) {
            console.error('Erro na verificação de autenticação:', response.status);
          }
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        setUser(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />;
  }

  if (!user) {
    return (
      <a
        href="/auth-page"
        className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-light-primary dark:bg-dark-primary text-white hover:bg-light-primary/90 dark:hover:bg-dark-primary/90 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
      >
        Entrar / Registrar
      </a>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {user.points || 0} pontos
        </span>
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            className="flex items-center space-x-2 rounded-lg p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            onMouseEnter={() => setIsMenuOpen(true)}
          >
            <img
              src={user.avatarUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
              alt={user.username}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
              {user.username}
            </span>
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <div>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 rounded-md"
                >
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
