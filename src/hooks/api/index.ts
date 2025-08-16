// Auth hooks
export * from './useAuth';

// User hooks  
export * from './useUsers';

// Desafios hooks
export * from './useDesafios';

// Posts hooks
export * from './usePosts';

// Re-export query client utilities
export { queryClient, queryKeys, invalidateQueries } from '@/lib/queryClient';