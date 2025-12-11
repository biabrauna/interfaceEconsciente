import api from './api';
import { Conquista } from '@/types/conquista';

export const conquistasService = {
  /**
   * Lista todas as conquistas disponíveis
   */
  async getAll(): Promise<Conquista[]> {
    const response = await api.get<Conquista[]>('/conquistas');
    return response.data;
  },

  /**
   * Lista conquistas do usuário logado com status de desbloqueio
   */
  async getMy(): Promise<Conquista[]> {
    const response = await api.get<Conquista[]>('/conquistas/minhas');
    return response.data;
  },

  /**
   * Popular conquistas iniciais (desenvolvimento)
   */
  async seed(): Promise<Conquista[]> {
    const response = await api.post<Conquista[]>('/conquistas/seed');
    return response.data;
  },
};
