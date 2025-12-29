import { createContext, useContext, ReactNode } from 'react';
import { useAuthState, useLogin, useLogout } from '@/hooks/api';
import { LoginResult, AuthContextType } from '@/types';
import { ValidationUtils } from '@/utils/validation';
import { createApiError } from '@/utils/errorHandler';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const { user, isLoading, error: authError, isAuthenticated, isSynced } = useAuthState();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      ValidationUtils.validateLoginForm(email, password);
      console.log('[AuthProvider] Iniciando login...');
      const result = await loginMutation.mutateAsync({ email: email.trim(), password });
      console.log('[AuthProvider] Login completado:', { success: result.success });
      return result;
    } catch (error) {
      console.error('[AuthProvider] Erro no login:', error);
      const appError = createApiError(error, 'Login');
      return { success: false, error: appError.message };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('[AuthProvider] Iniciando logout...');
      await logoutMutation.mutateAsync();
      console.log('[AuthProvider] Logout completado');
    } catch (error) {
      console.error('[AuthProvider] Erro no logout:', error);
      createApiError(error, 'Logout');
    }
  };

  const value: AuthContextType = {
    user: user || null,
    loading: isLoading || loginMutation.isPending || logoutMutation.isPending,
    error: authError?.message || loginMutation.error?.message || logoutMutation.error?.message || '',
    login,
    logout,
  };

  // Log de sincronização para debug
  if (!isSynced && !isLoading) {
    console.warn('[AuthProvider] Token e usuário não sincronizados');
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};