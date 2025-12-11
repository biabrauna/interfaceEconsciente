import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { comentariosService } from '@/services/comentarios';
import { CreateComentarioData } from '@/types/comentario';
import { showToast } from '@/lib/toast';

export function useComentariosByPost(postId: string) {
  return useQuery({
    queryKey: ['comentarios', postId],
    queryFn: () => comentariosService.getByPost(postId),
    enabled: !!postId,
    staleTime: 30000, // 30 segundos
  });
}

export function useCreateComentario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateComentarioData) => comentariosService.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comentarios', variables.postId] });
      showToast.success('Comentário adicionado!');
    },
    onError: () => {
      showToast.error('Erro ao adicionar comentário');
    },
  });
}

export function useDeleteComentario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comentarioId, userId, postId }: { comentarioId: string; userId: string; postId: string }) =>
      comentariosService.delete(comentarioId, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comentarios', variables.postId] });
      showToast.success('Comentário removido');
    },
    onError: () => {
      showToast.error('Erro ao remover comentário');
    },
  });
}

export function useComentariosCount(postId: string) {
  return useQuery({
    queryKey: ['comentarios-count', postId],
    queryFn: () => comentariosService.count(postId),
    enabled: !!postId,
    staleTime: 30000,
  });
}
