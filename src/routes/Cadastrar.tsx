import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useRegister } from '@/hooks/api';
import { RegisterFormData } from '@/types';
import { ValidationUtils } from '@/utils/validation';
import { createApiError } from '@/utils/errorHandler';

const Cadastrar: React.FC = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    age: '',
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
      const registerData = {
        ...formData,
        age: parseInt(formData.age, 10)
      };
      
      ValidationUtils.validateRegisterForm(formData);
      
      await registerMutation.mutateAsync(registerData);
      navigate('/');
    } catch (error) {
      const appError = createApiError(error, 'User registration');
      setError(appError.message);
    }
  };

  return (
    <div className='container-cadastro'>
      <div className="container-inputs-cadastro">
        <form className='form-cadastro' onSubmit={handleSubmit}>
          <div className='border-box'>
            <input 
              className="input" 
              type="text" 
              placeholder="Digite seu primeiro nome" 
              value={formData.name}
              onChange={handleInputChange('name')} 
              disabled={registerMutation.isPending}
              required
            />
          </div>
          <div className='border-box'>
            <input 
              className="input" 
              type="email" 
              placeholder="Digite seu e-mail" 
              value={formData.email}
              onChange={handleInputChange('email')} 
              disabled={registerMutation.isPending}
              required
            />
          </div>
          <div className='border-box'>
            <input 
              className="input" 
              type="number" 
              placeholder="Digite sua idade" 
              value={formData.age}
              onChange={handleInputChange('age')} 
              disabled={registerMutation.isPending}
              min="13"
              max="120"
              required
            />
          </div>
          <div className='border-box'>
            <input 
              className="input" 
              type="text" 
              placeholder="Conte um pouco sobre você..." 
              value={formData.biografia}
              onChange={handleInputChange('biografia')} 
              disabled={registerMutation.isPending}
            />
          </div>
          <div className='border-box'>
            <input 
              className="input" 
              type="password" 
              placeholder="Digite sua senha" 
              value={formData.password}
              onChange={handleInputChange('password')} 
              disabled={registerMutation.isPending}
              required
            />
          </div>
          <div className='border-box'>
            <input 
              className="input" 
              type="password" 
              placeholder="Confirme sua senha" 
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')} 
              disabled={registerMutation.isPending}
              required
            />
          </div>
          <Link className="link" to="/">
            <p>Já tem uma conta?
              <span> Entrar</span>
            </p>
          </Link>
          <button 
            className='btn' 
            type="submit" 
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          {(error || registerMutation.error) && (
            <p style={{
              color: 'red', 
              fontSize: '12px', 
              fontWeight: 'bold', 
              margin: '10px 0', 
              padding: '0', 
              textAlign: 'center'
            }}>
              {error || registerMutation.error?.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Cadastrar;