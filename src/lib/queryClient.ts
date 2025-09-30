import { QueryClient } from '@tanstack/react-query';
import { createApiError } from '@/utils/errorHandler';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        const apiError = createApiError(error, 'Query retry check');
        if (apiError.status >= 400 && apiError.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false, // Don't retry mutations by default
      onError: (error) => {
        const apiError = createApiError(error, 'Mutation error');
        console.error('Mutation failed:', apiError.message);
      },
    },
  },
});

// Query keys factory for consistency
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  users: {
    all: ['users'] as const,
    list: (page: number, limit: number) => ['users', 'list', page, limit] as const,
    detail: (id: string) => ['users', id] as const,
    profile: (userId: string) => ['users', userId, 'profile'] as const,
    profilePics: () => ['users', 'profilePics'] as const,
  },
  desafios: {
    all: ['desafios'] as const,
    list: (page: number, limit: number) => ['desafios', 'list', page, limit] as const,
    detail: (id: string) => ['desafios', id] as const,
  },
  posts: {
    all: ['posts'] as const,
    detail: (id: string) => ['posts', id] as const,
    byUser: (userId: string) => ['posts', 'user', userId] as const,
  },
} as const;

// Utility function to invalidate related queries
export const invalidateQueries = {
  auth: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.me }),
  user: (userId?: string) => {
    queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    if (userId) {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) });
    }
  },
  posts: () => queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
  desafios: () => queryClient.invalidateQueries({ queryKey: queryKeys.desafios.all }),
};