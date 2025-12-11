import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { conquistasService } from '@/services/conquistas';
import { Conquista } from '@/types/conquista';

const QUERY_KEYS = {
  all: ['conquistas'] as const,
  my: ['conquistas', 'my'] as const,
};

/**
 * Hook para listar todas as conquistas disponíveis
 */
export function useConquistas() {
  return useQuery({
    queryKey: QUERY_KEYS.all,
    queryFn: conquistasService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/**
 * Hook para listar conquistas do usuário logado
 */
export function useMyConquistas() {
  return useQuery({
    queryKey: QUERY_KEYS.my,
    queryFn: conquistasService.getMy,
    staleTime: 1000 * 60 * 2, // 2 minutos
    refetchInterval: 1000 * 60, // Refetch a cada 1 minuto
  });
}

/**
 * Hook para popular conquistas iniciais (desenvolvimento)
 */
export function useSeedConquistas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: conquistasService.seed,
    onSuccess: () => {
      // Invalida cache para refetch
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.my });
    },
  });
}

/**
 * Hook para obter conquistas desbloqueadas
 */
export function useConquistasDesbloqueadas() {
  const { data: conquistas, ...rest } = useMyConquistas();

  const desbloqueadas = conquistas?.filter(c => c.desbloqueada) || [];
  const bloqueadas = conquistas?.filter(c => !c.desbloqueada) || [];

  return {
    ...rest,
    conquistas,
    desbloqueadas,
    bloqueadas,
    totalDesbloqueadas: desbloqueadas.length,
    totalBloqueadas: bloqueadas.length,
    progresso: conquistas ? (desbloqueadas.length / conquistas.length) * 100 : 0,
  };
}
