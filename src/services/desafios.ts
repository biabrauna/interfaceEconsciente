import api from './api';
import { Desafios, PaginatedDesafios } from '@/types';

export const desafiosService = {
  /**
   * Lista todos os desafios com paginação
   */
  async getAll(page: number = 1, limit: number = 10): Promise<PaginatedDesafios> {
    const response = await api.get<PaginatedDesafios>('/desafios', {
      params: { page, limit }
    });
    return response.data;
  },

  /**
   * Busca um desafio específico por ID
   */
  async getById(desafioId: string): Promise<Desafios> {
    const response = await api.get<Desafios>(`/desafios/${desafioId}`);
    return response.data;
  },

  /**
   * Completa um desafio para o usuário logado
   */
  async complete(desafioId: string): Promise<{ message: string; pontos: number }> {
    const response = await api.post<{ message: string; pontos: number }>(`/desafios/${desafioId}/completar`);
    return response.data;
  },

  /**
   * Cria um novo desafio (admin)
   */
  async create(desafioData: Omit<Desafios, 'id' | 'createdAt' | 'updatedAt'>): Promise<Desafios> {
    const response = await api.post<Desafios>('/desafios', desafioData);
    return response.data;
  },

  /**
   * Atualiza um desafio existente (admin)
   */
  async update(desafioId: string, desafioData: Partial<Omit<Desafios, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Desafios> {
    const response = await api.put<Desafios>(`/desafios/${desafioId}`, desafioData);
    return response.data;
  },

  /**
   * Deleta um desafio (admin)
   */
  async delete(desafioId: string): Promise<void> {
    await api.delete(`/desafios/${desafioId}`);
  },
};
