import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createApiError } from '@/utils/errorHandler';
import { ApiResponse } from '@/types';

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
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        console.log('[API Interceptor] Request:', {
          url: config.url,
          method: config.method,
          hasToken: !!token,
          tokenPreview: token ? `${token.substring(0, 20)}...` : 'none'
        });

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(createApiError(error, 'Request setup'))
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const apiError = createApiError(error, 'API Response');

        // Handle unauthorized access
        if (apiError.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/';
        }

        // Handle rate limit (429)
        if (apiError.status === 429) {
          console.warn('⚠️ Rate limit atingido. Aguarde alguns segundos antes de tentar novamente.');
          // Você pode adicionar uma notificação visual aqui
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
}

const api = new ApiService();
export default api;
