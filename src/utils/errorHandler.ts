import { AppError, NetworkError, ValidationError, UnauthorizedError } from '@/types';

export class ErrorHandler {
  static handleApiError(error: unknown): AppError {
    if (error instanceof AppError) {
      return error;
    }

    if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as any;
      
      if (!axiosError.response) {
        return new NetworkError();
      }

      const { status, data } = axiosError.response;
      const message = data?.message || this.getDefaultErrorMessage(status);

      switch (status) {
        case 400:
          return new ValidationError(message);
        case 401:
          return new UnauthorizedError(message);
        case 403:
          return new AppError('Acesso negado', 403, 'FORBIDDEN');
        case 404:
          return new AppError('Recurso não encontrado', 404, 'NOT_FOUND');
        case 422:
          return new ValidationError(message);
        case 500:
          return new AppError('Erro interno do servidor', 500, 'INTERNAL_ERROR');
        default:
          return new AppError(message, status);
      }
    }

    if (error instanceof Error) {
      return new AppError(error.message);
    }

    return new AppError('Erro desconhecido');
  }

  private static getDefaultErrorMessage(status: number): string {
    const messages: Record<number, string> = {
      400: 'Dados inválidos',
      401: 'Credenciais inválidas',
      403: 'Acesso negado',
      404: 'Recurso não encontrado',
      422: 'Dados inválidos',
      500: 'Erro interno do servidor',
      502: 'Servidor indisponível',
      503: 'Serviço temporariamente indisponível'
    };

    return messages[status] || 'Erro inesperado';
  }

  static logError(error: AppError, context?: string): void {
    const errorInfo = {
      message: error.message,
      status: error.status,
      code: error.code,
      context,
      timestamp: new Date().toISOString()
    };

    // In production, this would send to a logging service like Sentry
    console.error('Application Error:', errorInfo);
  }
}

export const createApiError = (error: unknown, context?: string): AppError => {
  const apiError = ErrorHandler.handleApiError(error);
  ErrorHandler.logError(apiError, context);
  return apiError;
};