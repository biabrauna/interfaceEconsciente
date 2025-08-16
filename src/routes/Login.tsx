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
      <div className="container-inputs">
        <form className='form-login' onSubmit={handleLogin}>
          <input 
            className="input" 
            type="email" 
            placeholder="Digite seu e-mail" 
            value={formData.email}
            onChange={handleInputChange('email')} 
            disabled={isLoading}
            required 
          />
          <input 
            className="input" 
            type="password" 
            placeholder="Digite sua senha" 
            value={formData.password}
            onChange={handleInputChange('password')} 
            disabled={isLoading}
            required 
          />
          <button 
            className='btn' 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          <Link className="link" to="/Cadastrar">
            <p>Ainda não tem uma conta?
              <span> Cadastre-se</span>
            </p>
          </Link>
        </form>
        {displayError && (
          <p style={{ 
            color: 'red', 
            fontSize: '18px', 
            fontWeight: 'bold', 
            margin: '30px', 
            padding: '0', 
            textAlign: 'center' 
          }}>
            {displayError}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;