import { useState, useEffect } from 'react';

export default function Header() {
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

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6">
          <div className="flex items-center">
            <a href="/">
              <span className="sr-only">Pregunta</span>
              <span className="text-2xl font-bold text-indigo-600">Pregunta</span>
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              <a href="/game" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Jogar
              </a>
              <a href="/ranking" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Ranking
              </a>
              <a href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Sobre
              </a>
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {error && (
              <div className="text-sm text-red-600">{error}</div>
            )}
            {loading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.points || 0} pontos</span>
                <div className="relative group">
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
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                >
                  Entrar
                </a>
                <a
                  href="/register"
                  className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Registrar
                </a>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          <a href="/game" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Jogar
          </a>
          <a href="/ranking" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Ranking
          </a>
          <a href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Sobre
          </a>
        </div>
      </nav>
    </header>
  );
}
