import api from './api';
import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';
import { createApiError } from '@/utils/errorHandler';
import { TokenManager } from '@/utils/tokenManager';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('[AuthService] Iniciando login...');
      const response = await api.post<AuthResponse>('/auth/login', credentials);

      if (response.data.access_token) {
        console.log('[AuthService] Token JWT recebido do backend');
        // Armazena token JWT usando TokenManager
        // Backend gerencia sessões via banco de dados usando o userId do token
        TokenManager.setToken(response.data.access_token);
      } else {
        console.warn('[AuthService] Nenhum token recebido no response');
        throw new Error('Token de autenticação não recebido');
      }

      return response.data;
    } catch (error) {
      console.error('[AuthService] Erro no login:', error);
      // Limpa qualquer token existente em caso de erro
      this.clearToken();
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
      console.log('[AuthService] Iniciando logout...');
      // Chamar endpoint de logout no backend para invalidar sessões no banco
      await api.post('/auth/logout');
      console.log('[AuthService] Sessões invalidadas no backend');
    } catch (error) {
      // Log error but don't throw - we still want to clear local storage
      console.error('[AuthService] Erro ao fazer logout no backend:', error);
    } finally {
      // Sempre limpa o token local usando TokenManager
      TokenManager.clearToken();
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
    return TokenManager.getToken();
  }

  static isAuthenticated(): boolean {
    return TokenManager.isValid();
  }

  static clearToken(): void {
    TokenManager.clearToken();
  }
}

// Export individual functions for backward compatibility
export const login = AuthService.login;
export const logout = AuthService.logout;
export const getMe = AuthService.getMe;