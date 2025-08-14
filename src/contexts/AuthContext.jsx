import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
      setError('');
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/user', { email, password });
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('token', access_token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || 'Email ou senha inválidos';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setError('');
      setLoading(false);
      // Navigation will be handled by the component calling logout
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};