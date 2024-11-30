import { useState, useEffect } from 'react';

const dropdownStyles = `
  .dropdown-menu {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
  }

  .dropdown-container:hover .dropdown-menu,
  .dropdown-menu:hover {
    opacity: 1;
    visibility: visible;
  }
`;

export default function HeaderAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Verificando autenticação...');
        const response = await fetch('/api/auth/me');
        console.log('Status da resposta:', response.status);

        if (response.ok) {
          const userData = await response.json();
          console.log('Dados do usuário:', userData);
          setUser(userData);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.log('Erro na resposta:', response.status, errorData);
          setError(errorData.message || 'Erro ao verificar autenticação');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setError('Erro ao verificar autenticação');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Fazendo logout...');
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      console.log('Status do logout:', response.status);

      if (response.ok) {
        window.location.href = '/';
      } else {
        setError('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setError('Erro ao fazer logout');
    }
  };

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>;
  }

  if (!user) {
    return (
      <div className="flex space-x-4">
        <a
          href="/api/auth/github"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Entrar com GitHub
        </a>
      </div>
    );
  }

  return (
    <>
      <style>{dropdownStyles}</style>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">{user.points || 0} pontos</span>
        <div className="relative dropdown-container">
          <button
            type="button"
            className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <img
              src={user.avatarUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
              alt={user.username}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{user.username}</span>
          </button>
          <div className="absolute right-0 top-full pt-2 w-48 dropdown-menu">
            <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
