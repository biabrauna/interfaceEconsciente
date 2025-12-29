import api from './api';
import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';
import { createApiError } from '@/utils/errorHandler';
import { useNavigate } from 'react-router-dom';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('[AuthService] Iniciando login...');
      const response = await api.post<AuthResponse>('/auth/login', credentials);

      if (response.data.access_token) {
        console.log('[AuthService] Token recebido, salvando no localStorage...');
        localStorage.setItem('token', response.data.access_token);

        // Verificar se foi salvo corretamente
        const savedToken = localStorage.getItem('token');
        console.log('[AuthService] Token salvo:', {
          saved: !!savedToken,
          matches: savedToken === response.data.access_token,
          tokenPreview: savedToken ? `${savedToken.substring(0, 20)}...` : 'none'
        });
      } else {
        console.warn('[AuthService] Nenhum token recebido no response');
      }

      return response.data;
    } catch (error) {
      console.error('[AuthService] Erro no login:', error);
      throw createApiError(error, 'Login');
    }
  }

  static async register(userData: RegisterData): Promise<User> {
    try {
      const response = await api.post<User>('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw createApiError(error, 'Registration');
    }
  }

  static async logout(): Promise<void> {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      // Log error but don't throw - we still want to clear local storage
      createApiError(error, 'Logout');
    }
  }

  static async getMe(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      throw createApiError(error, 'Get user profile');
    }
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static clearToken(): void {
    localStorage.removeItem('token');
  }
}

// Export individual functions for backward compatibility
export const login = AuthService.login;
export const logout = AuthService.logout;
export const getMe = AuthService.getMe;