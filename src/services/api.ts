import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createApiError } from '@/utils/errorHandler';
import { ApiResponse } from '@/types';
import { TokenManager } from '@/utils/tokenManager';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - Adiciona JWT token aos headers
    this.api.interceptors.request.use(
      (config) => {
        const token = TokenManager.getToken();

        if (token) {
          // Verifica se token não está expirado antes de adicionar
          if (!TokenManager.isTokenExpired()) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('[API Interceptor] Token JWT adicionado ao header Authorization');
          } else {
            console.warn('[API Interceptor] Token JWT expirado, não adicionado ao header');
            TokenManager.clearToken();
          }
        } else {
          console.log('[API Interceptor] Nenhum token JWT disponível');
        }

        console.log('[API Interceptor] Request:', {
          url: config.url,
          method: config.method?.toUpperCase(),
          hasToken: !!token && !TokenManager.isTokenExpired(),
          withCredentials: config.withCredentials
        });

        return config;
      },
      (error) => Promise.reject(createApiError(error, 'Request setup'))
    );

    // Response interceptor - Gerencia erros de autenticação
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('[API Interceptor] Response:', {
          url: response.config.url,
          status: response.status,
          hasData: !!response.data
        });
        return response;
      },
      (error) => {
        const apiError = createApiError(error, 'API Response');

        // Handle unauthorized access - Limpa token JWT e redireciona
        if (apiError.status === 401) {
          console.warn('[API Interceptor] Token JWT inválido ou expirado (401)');
          console.warn('[API Interceptor] Limpando autenticação local...');
          TokenManager.clearToken();
          // Backend invalida sessões automaticamente quando token é inválido
          // Redireciona apenas se não estiver na página de login
          if (!window.location.pathname.includes('/Login') && !window.location.pathname.includes('/Cadastrar')) {
            console.warn('[API Interceptor] Redirecionando para login...');
            window.location.href = '/';
          }
        }

        // Handle rate limit (429)
        if (apiError.status === 429) {
          console.warn('[API Interceptor] Rate limit atingido. Aguarde alguns segundos.');
        }

        return Promise.reject(apiError);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw createApiError(error, `GET ${url}`);
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw createApiError(error, `POST ${url}`);
    }
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw createApiError(error, `PUT ${url}`);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<T>(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw createApiError(error, `DELETE ${url}`);
    }
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.patch<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw createApiError(error, `PATCH ${url}`);
    }
  }
}

const api = new ApiService();
export default api;
