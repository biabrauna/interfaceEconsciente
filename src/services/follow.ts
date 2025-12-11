import api from './api';
import { Follow, Follower } from '@/types/follow';

export const followService = {
  /**
   * Seguir um usuário
   */
  async follow(userId: string): Promise<Follow> {
    const response = await api.post<Follow>(`/follow/${userId}`);
    return response.data;
  },

  /**
   * Deixar de seguir um usuário
   */
  async unfollow(userId: string): Promise<void> {
    await api.delete(`/follow/${userId}`);
  },

  /**
   * Verificar se segue um usuário
   */
  async isFollowing(userId: string): Promise<boolean> {
    const response = await api.get<{ isFollowing: boolean }>(`/follow/check/${userId}`);
    return response.data.isFollowing;
  },

  /**
   * Listar seguidores de um usuário
   */
  async getFollowers(userId: string): Promise<Follower[]> {
    const response = await api.get<Follower[]>(`/follow/followers/${userId}`);
    return response.data;
  },

  /**
   * Listar usuários que um usuário está seguindo
   */
  async getFollowing(userId: string): Promise<Follower[]> {
    const response = await api.get<Follower[]>(`/follow/following/${userId}`);
    return response.data;
  },

  /**
   * Listar meus seguidores
   */
  async getMyFollowers(): Promise<Follower[]> {
    const response = await api.get<Follower[]>('/follow/my-followers');
    return response.data;
  },

  /**
   * Listar usuários que estou seguindo
   */
  async getMyFollowing(): Promise<Follower[]> {
    const response = await api.get<Follower[]>('/follow/my-following');
    return response.data;
  },
};
