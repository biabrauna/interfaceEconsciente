import api from './api';
import { Comentario, CreateComentarioData } from '@/types/comentario';

export const comentariosService = {
  async getByPost(postId: string): Promise<Comentario[]> {
    const response = await api.get<Comentario[]>(`/comentarios/post/${postId}`);
    return response.data;
  },

  async create(data: CreateComentarioData): Promise<Comentario> {
    const response = await api.post<Comentario>('/comentarios', data);
    return response.data;
  },

  async delete(comentarioId: string, userId: string): Promise<void> {
    await api.delete(`/comentarios/${comentarioId}`, {
      params: { userId },
    });
  },

  async count(postId: string): Promise<number> {
    const response = await api.get<{ count: number }>(`/comentarios/post/${postId}/count`);
    return response.data.count;
  },
};
