import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { followService } from '@/services/follow';

const QUERY_KEYS = {
  followers: (userId: string) => ['follow', 'followers', userId] as const,
  following: (userId: string) => ['follow', 'following', userId] as const,
  isFollowing: (userId: string) => ['follow', 'isFollowing', userId] as const,
  myFollowers: ['follow', 'my-followers'] as const,
  myFollowing: ['follow', 'my-following'] as const,
};

/**
 * Hook para seguir um usuário
 */
export function useFollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followService.follow(userId),
    onSuccess: (_, userId) => {
      // Invalida caches relacionados
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.isFollowing(userId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myFollowing });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.followers(userId) });

      // Invalida queries de usuários de forma mais específica
      queryClient.invalidateQueries({ queryKey: ['users'] }); // Lista geral
      queryClient.invalidateQueries({ queryKey: ['users', userId] }); // Usuário específico sendo seguido
      queryClient.invalidateQueries({ queryKey: ['usuarios', userId] }); // Endpoint correto do backend
    },
    onError: (error) => {
      console.error('Erro ao seguir usuário:', error);
    },
  });
}

/**
 * Hook para deixar de seguir um usuário
 */
export function useUnfollowUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => followService.unfollow(userId),
    onSuccess: (_, userId) => {
      // Invalida caches relacionados
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.isFollowing(userId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myFollowing });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.followers(userId) });

      // Invalida queries de usuários de forma mais específica
      queryClient.invalidateQueries({ queryKey: ['users'] }); // Lista geral
      queryClient.invalidateQueries({ queryKey: ['users', userId] }); // Usuário específico
      queryClient.invalidateQueries({ queryKey: ['usuarios', userId] }); // Endpoint correto do backend
    },
    onError: (error) => {
      console.error('Erro ao deixar de seguir usuário:', error);
    },
  });
}

/**
 * Hook para verificar se segue um usuário
 */
export function useIsFollowing(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.isFollowing(userId),
    queryFn: () => followService.isFollowing(userId),
    enabled: !!userId,
    staleTime: 1000 * 60, // 1 minuto
    retry: false, // Não fazer retry nessa query
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook para listar seguidores de um usuário
 */
export function useFollowers(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.followers(userId),
    queryFn: () => followService.getFollowers(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}

/**
 * Hook para listar usuários que um usuário está seguindo
 */
export function useFollowing(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.following(userId),
    queryFn: () => followService.getFollowing(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}

/**
 * Hook para listar meus seguidores
 */
export function useMyFollowers() {
  return useQuery({
    queryKey: QUERY_KEYS.myFollowers,
    queryFn: followService.getMyFollowers,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}

/**
 * Hook para listar usuários que estou seguindo
 */
export function useMyFollowing() {
  return useQuery({
    queryKey: QUERY_KEYS.myFollowing,
    queryFn: followService.getMyFollowing,
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}
