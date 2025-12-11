import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificacoesService } from '@/services/notificacoes';

const QUERY_KEYS = {
  all: ['notificacoes'] as const,
  unread: ['notificacoes', 'unread'] as const,
  count: ['notificacoes', 'count'] as const,
};

/**
 * Hook para listar todas as notificações
 */
export function useNotificacoes(onlyUnread = false) {
  return useQuery({
    queryKey: onlyUnread ? QUERY_KEYS.unread : QUERY_KEYS.all,
    queryFn: () => notificacoesService.getAll(onlyUnread),
    staleTime: 1000 * 30, // 30 segundos
    refetchInterval: 1000 * 60, // Refetch a cada 1 minuto
  });
}

/**
 * Hook para contar notificações não lidas
 */
export function useNotificacoesCount() {
  return useQuery({
    queryKey: QUERY_KEYS.count,
    queryFn: notificacoesService.countUnread,
    staleTime: 1000 * 30, // 30 segundos
    refetchInterval: 1000 * 30, // Refetch a cada 30 segundos
  });
}

/**
 * Hook para marcar notificação como lida
 */
export function useMarkNotificacaoAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificacoesService.markAsRead(id),
    onSuccess: () => {
      // Invalida cache para refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unread });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.count });
    },
  });
}

/**
 * Hook para marcar todas notificações como lidas
 */
export function useMarkAllNotificacoesAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificacoesService.markAllAsRead,
    onSuccess: () => {
      // Invalida cache para refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unread });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.count });
    },
  });
}
