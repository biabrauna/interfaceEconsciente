import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth';
import { queryKeys, invalidateQueries } from '@/lib/queryClient';
import { LoginCredentials, RegisterData, User, LoginResult } from '@/types';
import { createApiError } from '@/utils/errorHandler';

// Query hook for getting current user
export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async (): Promise<User> => {
      try {
        return await AuthService.getMe();
      } catch (error) {
        throw createApiError(error, 'Get current user');
      }
    },
    enabled: !!AuthService.getToken(), // Only run if token exists
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Mutation hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResult> => {
      try {
        console.log('[useLogin] Chamando AuthService.login...');
        const authResponse = await AuthService.login(credentials);
        console.log('[useLogin] AuthService.login completado:', {
          hasUser: !!authResponse.user,
          hasToken: !!authResponse.access_token
        });
        return { success: true, user: authResponse.user };
      } catch (error) {
        console.error('[useLogin] Erro na mutação:', error);
        const apiError = createApiError(error, 'Login');
        return { success: false, error: apiError.message };
      }
    },
    onSuccess: (result) => {
      console.log('[useLogin] onSuccess chamado:', { success: result.success });
      if (result.success && result.user) {
        // Set user data in cache
        console.log('[useLogin] Definindo usuário no cache do React Query...');
        queryClient.setQueryData(queryKeys.auth.me, result.user);
        // Invalidate any other auth-related queries
        console.log('[useLogin] Invalidando queries relacionadas à auth...');
        invalidateQueries.auth();
        console.log('[useLogin] Processo onSuccess completo');
      }
    },
    onError: (error) => {
      console.error('[useLogin] Login mutation failed:', error);
    },
  });
};

// Mutation hook for registration
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterData): Promise<User> => {
      try {
        return await AuthService.register(userData);
      } catch (error) {
        throw createApiError(error, 'User registration');
      }
    },
    onSuccess: () => {
      // Don't auto-login after registration, just invalidate queries
      invalidateQueries.auth();
    },
    onError: (error) => {
      console.error('Registration mutation failed:', error);
    },
  });
};

// Mutation hook for logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        await AuthService.logout();
      } catch (error) {
        // Log error but still proceed with logout
        createApiError(error, 'Logout');
      }
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Remove user from cache
      queryClient.removeQueries({ queryKey: queryKeys.auth.me });
    },
    onError: (error) => {
      console.error('Logout mutation failed:', error);
      // Still clear cache even if logout fails
      queryClient.clear();
    },
  });
};

// Hook to check if user is authenticated
export const useIsAuthenticated = (): boolean => {
  const { data: user } = useMe();
  return !!user && !!AuthService.getToken();
};

// Hook to get auth state with loading
export const useAuthState = () => {
  const { data: user, isLoading, error } = useMe();
  
  return {
    user,
    isLoading,
    error: error ? createApiError(error, 'Auth state') : null,
    isAuthenticated: !!user && !!AuthService.getToken(),
  };
};