// User types
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  biografia?: string;
  pontos: number;
  seguidores: number;
  seguindo: number;
  createdAt?: string;
  updatedAt?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  age: string;
  password: string;
  confirmPassword: string;
  biografia?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

// API types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface Desafios {
  id: string;
  desafios: string;
  valor: number;
}

export interface ProfilePic {
  id: string;
  url: string;
  name: string;
  userId: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

// Component prop types
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

// Error types
export class AppError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Erro de conexão com o servidor') {
    super(message, 0, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Acesso não autorizado') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

// Form types
export interface FormErrors {
  [key: string]: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  age: string;
  password: string;
  confirmPassword: string;
  biografia: string;
}