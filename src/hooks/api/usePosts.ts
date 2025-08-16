import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { queryKeys, invalidateQueries } from '@/lib/queryClient';
import { createApiError } from '@/utils/errorHandler';

// Interface for Post
export interface Post {
  id: string;
  userId: string;
  url: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
  };
}

// Interface for creating a post
export interface CreatePostData {
  url: string;
  userId: string;
  likes?: number;
}

// Hook to get all posts
export const usePosts = () => {
  return useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: async (): Promise<Post[]> => {
      try {
        const response = await api.get<Post[]>('/posts');
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Get all posts');
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get a specific post
export const usePost = (postId: string) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(postId),
    queryFn: async (): Promise<Post> => {
      try {
        const response = await api.get<Post>(`/posts/${postId}`);
        return response.data;
      } catch (error) {
        throw createApiError(error, `Get post ${postId}`);
      }
    },
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get posts by a specific user
export const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.posts.byUser(userId),
    queryFn: async (): Promise<Post[]> => {
      try {
        const response = await api.get<Post[]>(`/posts/user/${userId}`);
        return response.data;
      } catch (error) {
        // If endpoint doesn't exist, try filtering from all posts
        const allPostsResponse = await api.get<Post[]>('/posts');
        return allPostsResponse.data.filter(post => post.userId === userId);
      }
    },
    enabled: !!userId,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Hook to create a new post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: CreatePostData): Promise<Post> => {
      try {
        const response = await api.post<Post>('/posts', postData);
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Create post');
      }
    },
    onSuccess: (newPost) => {
      // Add to the list of all posts
      queryClient.setQueryData(queryKeys.posts.all, (old: Post[] = []) => {
        return [newPost, ...old]; // Add at the beginning (newest first)
      });
      
      // Add to user's posts
      queryClient.setQueryData(queryKeys.posts.byUser(newPost.userId), (old: Post[] = []) => {
        return [newPost, ...old];
      });
      
      // Set individual post data
      queryClient.setQueryData(queryKeys.posts.detail(newPost.id), newPost);
      
      invalidateQueries.posts();
    },
  });
};

// Hook to update a post (like adding likes)
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: Partial<Post> & { id: string }): Promise<Post> => {
      try {
        const response = await api.put<Post>(`/posts/${postData.id}`, postData);
        return response.data;
      } catch (error) {
        throw createApiError(error, `Update post ${postData.id}`);
      }
    },
    onSuccess: (updatedPost) => {
      // Update in all posts list
      queryClient.setQueryData(queryKeys.posts.all, (old: Post[] = []) => {
        return old.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
      });
      
      // Update in user's posts
      queryClient.setQueryData(queryKeys.posts.byUser(updatedPost.userId), (old: Post[] = []) => {
        return old.map(post => 
          post.id === updatedPost.id ? updatedPost : post
        );
      });
      
      // Update individual post data
      queryClient.setQueryData(queryKeys.posts.detail(updatedPost.id), updatedPost);
    },
  });
};

// Hook to delete a post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string): Promise<void> => {
      try {
        await api.delete(`/posts/${postId}`);
      } catch (error) {
        throw createApiError(error, `Delete post ${postId}`);
      }
    },
    onSuccess: (_, postId) => {
      // Remove from all posts
      queryClient.setQueryData(queryKeys.posts.all, (old: Post[] = []) => {
        return old.filter(post => post.id !== postId);
      });
      
      // Remove from user posts (we don't know the userId here, so invalidate all user posts)
      queryClient.invalidateQueries({ 
        queryKey: ['posts', 'user'],
        exact: false 
      });
      
      // Remove individual post data
      queryClient.removeQueries({ queryKey: queryKeys.posts.detail(postId) });
      
      invalidateQueries.posts();
    },
  });
};

// Hook to like/unlike a post
export const useLikePost = () => {
  const updatePost = useUpdatePost();

  return useMutation({
    mutationFn: async ({ postId, currentLikes }: { postId: string; currentLikes: number }) => {
      return updatePost.mutateAsync({
        id: postId,
        likes: currentLikes + 1,
      });
    },
    onSuccess: () => {
      // The updatePost mutation will handle cache updates
    },
  });
};

// Hook for optimistic like updates
export const useOptimisticLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, increment }: { postId: string; increment: number }) => {
      // Optimistically update the UI
      const updatePost = (old: Post[] = []) => {
        return old.map(post => 
          post.id === postId 
            ? { ...post, likes: Math.max(0, post.likes + increment) }
            : post
        );
      };

      queryClient.setQueryData(queryKeys.posts.all, updatePost);
      
      // Try to update the actual post
      const response = await api.put<Post>(`/posts/${postId}/like`, { increment });
      return response.data;
    },
    onError: (error, { postId, increment }) => {
      // Revert the optimistic update on error
      const revertUpdate = (old: Post[] = []) => {
        return old.map(post => 
          post.id === postId 
            ? { ...post, likes: Math.max(0, post.likes - increment) }
            : post
        );
      };

      queryClient.setQueryData(queryKeys.posts.all, revertUpdate);
      
      console.error('Failed to like post:', createApiError(error, 'Like post'));
    },
  });
};