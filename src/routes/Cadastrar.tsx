import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useRegister } from '@/hooks/api';
import { RegisterFormData } from '@/types';
import { ValidationUtils } from '@/utils/validation';
import { createApiError } from '@/utils/errorHandler';
import PasswordStrength from '@/components/PasswordStrength';

const Cadastrar: React.FC = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    dataNascimento: '',
    password: '',
    confirmPassword: '',
    biografia: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    try {
      ValidationUtils.validateRegisterForm(formData);

      await registerMutation.mutateAsync(formData);
      navigate('/');
    } catch (error) {
      const appError = createApiError(error, 'User registration');
      setError(appError.message);
    }
  };

  return (
    <div className='container-cadastro'>
      <div className="cadastro-header">
        <div className="cadastro-eco-badge">
          <span className="eco-icon">🌍</span>
        </div>
        <h1 className="cadastro-title">Junte-se a nós!</h1>
        <p className="cadastro-subtitle">Faça parte da revolução sustentável</p>
      </div>

      <div className="container-inputs-cadastro">
        <form className='form-cadastro' onSubmit={handleSubmit}>
          <div className="input-group-cadastro">
            <span className="input-icon-cadastro">👤</span>
            <input
              className="input-cadastro"
              type="text"
              placeholder="Digite seu primeiro nome"
              value={formData.name}
              onChange={handleInputChange('name')}
              disabled={registerMutation.isPending}
              required
            />
          </div>

          <div className="input-group-cadastro">
            <span className="input-icon-cadastro">📧</span>
            <input
              className="input-cadastro"
              type="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleInputChange('email')}
              disabled={registerMutation.isPending}
              required
            />
          </div>

          <div className="input-group-cadastro">
            <span className="input-icon-cadastro">🎂</span>
            <input
              className="input-cadastro"
              type="date"
              placeholder="Data de nascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange('dataNascimento')}
              disabled={registerMutation.isPending}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="input-group-cadastro">
            <span className="input-icon-cadastro">✨</span>
            <input
              className="input-cadastro"
              type="text"
              placeholder="Conte um pouco sobre você..."
              value={formData.biografia}
              onChange={handleInputChange('biografia')}
              disabled={registerMutation.isPending}
            />
          </div>

          <div className="input-group-cadastro">
            <span className="input-icon-cadastro">🔒</span>
            <input
              className="input-cadastro"
              type="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleInputChange('password')}
              disabled={registerMutation.isPending}
              required
              minLength={8}
            />
          </div>
          <PasswordStrength password={formData.password} />

          <div className="input-group-cadastro">
            <span className="input-icon-cadastro">✅</span>
            <input
              className="input-cadastro"
              type="password"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              disabled={registerMutation.isPending}
              required
              minLength={8}
            />
          </div>

          <button
            className='btn-cadastro'
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <span className="btn-loading">
                <span className="spinner"></span>
                Cadastrando...
              </span>
            ) : (
              '🌱 Criar Conta'
            )}
          </button>

          <Link className="link-cadastro" to="/">
            <p>Já tem uma conta?
              <span className="link-highlight-cadastro"> Entrar</span>
            </p>
          </Link>

          {(error || registerMutation.error) && (
            <div className="error-message-cadastro">
              <span className="error-icon">⚠️</span>
              {error || registerMutation.error?.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Cadastrar;