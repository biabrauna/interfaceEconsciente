import api from './api';
import { AuthResponse, LoginCredentials, RegisterData, User } from '@/types';
import { createApiError } from '@/utils/errorHandler';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/user', credentials);
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
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
      await api.post('/auth/logout');
    } catch (error) {
      // Log error but don't throw - we still want to clear local storage
      createApiError(error, 'Logout');
    } finally {
      localStorage.removeItem('token');
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