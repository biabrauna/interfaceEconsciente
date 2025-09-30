import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useLogin } from '@/hooks/api';
import { LoginFormData } from '@/types';
import { ValidationUtils } from '@/utils/validation';
import { createApiError } from '@/utils/errorHandler';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

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
      
      const result = await loginMutation.mutateAsync({
        email: formData.email.trim(),
        password: formData.password
      });
      navigate('/Home');
    } catch (error) {
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