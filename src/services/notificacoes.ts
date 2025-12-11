import api from './api';
import { Notificacao } from '@/types/notificacao';

export const notificacoesService = {
  /**
   * Lista notificações do usuário logado
   */
  async getAll(onlyUnread = false): Promise<Notificacao[]> {
    const url = `/notificacoes${onlyUnread ? '?onlyUnread=true' : ''}`;
    const response = await api.get<Notificacao[]>(url);
    return response.data;
  },

  /**
   * Conta notificações não lidas
   */
  async countUnread(): Promise<number> {
    const response = await api.get<{ count: number }>('/notificacoes/count');
    return response.data.count;
  },

  /**
   * Marca notificação como lida
   */
  async markAsRead(id: string): Promise<void> {
    await api.patch(`/notificacoes/${id}/read`);
  },

  /**
   * Marca todas notificações como lidas
   */
  async markAllAsRead(): Promise<void> {
    await api.patch('/notificacoes/read-all');
  },
};
