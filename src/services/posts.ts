import api from './api';
import { Post, CreatePostData, PaginatedPosts } from '@/types/post';

export const postsService = {
  async getPosts(page: number = 1, limit: number = 10): Promise<PaginatedPosts> {
    const response = await api.get<PaginatedPosts>('/posts', {
      params: { page, limit }
    });
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<Post> {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  async getUserPosts(userId: string, page: number = 1, limit: number = 10): Promise<PaginatedPosts> {
    const response = await api.get<PaginatedPosts>(`/usuarios/${userId}/posts`, {
      params: { page, limit }
    });
    return response.data;
  },

  async getFeed(userId: string, page: number = 1, limit: number = 10): Promise<PaginatedPosts> {
    const response = await api.get<PaginatedPosts>(`/posts/feed/${userId}`, {
      params: { page, limit }
    });
    return response.data;
  },
};
