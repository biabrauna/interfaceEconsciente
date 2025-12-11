import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useLogin } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import { LoginFormData } from '@/types';
import { ValidationUtils } from '@/utils/validation';
import { createApiError } from '@/utils/errorHandler';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const loginMutation = useLogin();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (!loading && user) {
      navigate('/Home', { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (error || loginMutation.error) {
      setError('');
    }
  }, [formData.email, formData.password, error, loginMutation.error]);

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    try {
      ValidationUtils.validateLoginForm(formData.email, formData.password);

      console.log('[Login] Iniciando processo de login...');
      const result = await loginMutation.mutateAsync({
        email: formData.email.trim(),
        password: formData.password
      });

      console.log('[Login] Login mutação completada:', { success: result.success });

      // Aguardar um momento para garantir que o token está no localStorage
      // e que o React Query processou o onSuccess
      await new Promise(resolve => setTimeout(resolve, 100));

      // Verificar se o token está realmente no localStorage
      const token = localStorage.getItem('token');
      console.log('[Login] Verificando token antes de navegar:', {
        hasToken: !!token,
        tokenPreview: token ? `${token.substring(0, 20)}...` : 'none'
      });

      if (!token) {
        console.error('[Login] Token não encontrado no localStorage após login!');
        setError('Erro ao processar autenticação. Tente novamente.');
        return;
      }

      console.log('[Login] Navegando para /Home...');
      navigate('/Home');
    } catch (error) {
      console.error('[Login] Erro no processo de login:', error);
      const appError = createApiError(error, 'Login form submission');
      setError(appError.message);
    }
  };

  const displayError = error || loginMutation.error?.message;
  const isLoading = loginMutation.isPending;

  return (
    <div className='container-login'>
      <div className="login-logo-container">
        <div className="login-eco-badge">
          <span className="eco-icon">🌱</span>
        </div>
        <h1 className="login-title">EconSciente</h1>
        <p className="login-subtitle">Transformando hábitos, preservando o futuro</p>
      </div>

      <div className="container-inputs">
        <form className='form-login' onSubmit={handleLogin}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              className="input-modern"
              type="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleInputChange('email')}
              disabled={isLoading}
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              className="input-modern"
              type="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleInputChange('password')}
              disabled={isLoading}
              required
            />
          </div>

          <button
            className='btn-modern'
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                Entrando...
              </span>
            ) : (
              'Entrar'
            )}
          </button>

          <Link className="link-modern" to="/Cadastrar">
            <p>Ainda não tem uma conta?
              <span className="link-highlight"> Cadastre-se</span>
            </p>
          </Link>

          {displayError && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {displayError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;