import { useState } from 'react';
import Button from '../../common/Button';
import { Github, Mail } from 'lucide-react';

export default function AuthForm({ mode = 'login' }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const isLogin = mode === 'login';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    if (!isLogin) {
      if (!formData.username) {
        setError('Nome de usuário é obrigatório.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return false;
      }
      if (formData.password.length < 8) {
        setError('A senha deve ter pelo menos 8 caracteres.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao processar requisição');
      }

      // Guardar token de acesso
      localStorage.setItem('accessToken', data.accessToken);
      
      // Redirecionar para página inicial
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </h2>
        <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">
          {isLogin 
            ? 'Entre para começar a jogar' 
            : 'Crie sua conta para começar a jogar'}
        </p>
      </div>

      {/* Botões de OAuth */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleOAuthLogin('google')}
          icon={
            <img 
              src="/google.svg" 
              alt="Google" 
              className="w-5 h-5 mr-2"
            />
          }
        >
          Google
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleOAuthLogin('github')}
          icon={<Github className="w-5 h-5 mr-2" />}
        >
          GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-text-secondary/10 dark:border-dark-text-secondary/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary">
            Ou continue com email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {!isLogin && (
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
            >
              Nome de usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-light-surface dark:bg-dark-surface border border-light-text-secondary/10 dark:border-dark-text-secondary/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              placeholder="Seu nome de usuário"
            />
          </div>
        )}

        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-light-surface dark:bg-dark-surface border border-light-text-secondary/10 dark:border-dark-text-secondary/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-light-surface dark:bg-dark-surface border border-light-text-secondary/10 dark:border-dark-text-secondary/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
            placeholder="********"
          />
        </div>

        {!isLogin && (
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-light-surface dark:bg-dark-surface border border-light-text-secondary/10 dark:border-dark-text-secondary/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              placeholder="********"
            />
          </div>
        )}

        {error && (
          <div className="text-error-light dark:text-error-dark text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={loading}
          icon={<Mail className="w-5 h-5 mr-2" />}
        >
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </Button>
      </form>
    </div>
  );
}
