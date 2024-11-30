import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { userStore, setUser, setToken, setPoints, setPermissions } from '@stores/authStore';
import { Github } from 'lucide-react';
import { Modal } from '@ui/modals/Modal';
import { Button } from '@ui/base/Button';
import { Input } from '@ui/base/Input';
import { LoadingSpinner } from '@ui/base/LoadingSpinner';
import ApiService from '@lib/api/apiService';

export function AuthModal({ isOpen, onClose, lang = 'pt-br' }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError(lang === 'pt-br' ? 'Por favor, preencha todos os campos obrigatórios.' : 'Please fill in all required fields.');
      return false;
    }

    if (!isLogin) {
      if (!formData.username) {
        setError(lang === 'pt-br' ? 'Nome de usuário é obrigatório.' : 'Username is required.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError(lang === 'pt-br' ? 'As senhas não coincidem.' : 'Passwords do not match.');
        return false;
      }
      if (formData.password.length < 8) {
        setError(lang === 'pt-br' ? 'A senha deve ter pelo menos 8 caracteres.' : 'Password must be at least 8 characters long.');
        return false;
      }
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) return;

    try {
      const data = await ApiService.post('auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      setUser(data.user);
      setToken(data.accessToken);
      setPoints(data.user.points || 0);
      setPermissions(data.user.permissions || []);
      onClose();
    } catch (error) {
      setError(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) return;

    try {
      const data = await ApiService.post('auth/register', {
        name: formData.username,
        email: formData.email,
        password: formData.password
      });

      setUser(data.user);
      setToken(data.accessToken);
      setPoints(data.user.points || 0);
      setPermissions(data.user.permissions || []);
      onClose();
    } catch (error) {
      setError(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    // Implementar login social
    console.log(`Login com ${provider}`);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={isLogin ? (lang === 'pt-br' ? 'Entrar' : 'Login') : (lang === 'pt-br' ? 'Criar Conta' : 'Create Account')}
      size="sm"
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={lang === 'pt-br' ? 'Nome de usuário' : 'Username'}
              disabled={loading}
              required
            />
          )}

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={lang === 'pt-br' ? 'Email' : 'Email'}
            disabled={loading}
            required
          />

          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={lang === 'pt-br' ? 'Senha' : 'Password'}
            disabled={loading}
            required
          />

          {!isLogin && (
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={lang === 'pt-br' ? 'Confirmar senha' : 'Confirm password'}
              disabled={loading}
              required
            />
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : isLogin ? (
              lang === 'pt-br' ? 'Entrar' : 'Login'
            ) : (
              lang === 'pt-br' ? 'Criar Conta' : 'Create Account'
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-light-text-secondary/10 dark:border-dark-text-secondary/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary">
              {lang === 'pt-br' ? 'ou continue com' : 'or continue with'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('github')}
            disabled={loading}
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
        </div>

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-light-primary dark:text-dark-primary hover:underline"
            disabled={loading}
          >
            {isLogin
              ? (lang === 'pt-br' ? 'Não tem uma conta? Criar conta' : "Don't have an account? Sign up")
              : (lang === 'pt-br' ? 'Já tem uma conta? Entrar' : 'Already have an account? Login')}
          </button>
        </div>
      </div>
    </Modal>
  );
}
