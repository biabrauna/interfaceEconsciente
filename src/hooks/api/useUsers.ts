import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { queryKeys, invalidateQueries } from '@/lib/queryClient';
import { User, PaginatedUsers } from '@/types';
import { createApiError } from '@/utils/errorHandler';

// Interface for profile picture
export interface ProfilePic {
  id: string;
  userId: string;
  url: string;
  name: string;
}

// Hook to get all users (for ranking) with pagination
export const useUsers = (page: number = 1, limit: number = 100) => {
  return useQuery({
    queryKey: queryKeys.users.list(page, limit),
    queryFn: async (): Promise<PaginatedUsers> => {
      try {
        const response = await api.get<PaginatedUsers>('/usuarios', {
          params: { page, limit }
        });
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Get all users');
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook to get a specific user
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: async (): Promise<User> => {
      try {
        const response = await api.get<User>(`/usuarios/${userId}`);
        return response.data;
      } catch (error) {
        throw createApiError(error, `Get user ${userId}`);
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get user profile pictures
export const useProfilePics = () => {
  const hasToken = !!localStorage.getItem('token');

  console.log('[useProfilePics] Hook executado:', {
    hasToken,
    enabled: hasToken
  });

  return useQuery({
    queryKey: queryKeys.users.profilePics(),

    queryFn: async (): Promise<ProfilePic[]> => {
      console.log('[useProfilePics] QueryFn executada');
      try {
        const response = await api.get<ProfilePic[]>('/profile-pic');
        console.log('[useProfilePics] Resposta recebida:', { count: response.data?.length });
        return response.data;
      } catch (error) {
        console.error('[useProfilePics] Erro ao buscar fotos de perfil:', error);
        throw createApiError(error, 'Get profile pictures');
      }
    },
    enabled: hasToken, // Só executa se tiver token
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Helper function to validate URLs
const isValidUrl = (url: string | undefined): boolean => {
  if (!url || url.trim() === '') {
    console.warn('[useUserProfilePic] Empty or undefined URL detected');
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.error('[useUserProfilePic] Invalid URL detected:', url, error);
    return false;
  }
};

// Hook to get a specific user's profile picture
export const useUserProfilePic = (userId: string) => {
  const { data: profilePics, ...rest } = useProfilePics();

  const userProfilePic = profilePics?.find(pic => pic.userId === userId);

  // Validate and sanitize the URL before returning
  const sanitizedProfilePic = userProfilePic && isValidUrl(userProfilePic.url)
    ? userProfilePic
    : undefined;

  return {
    data: sanitizedProfilePic,
    ...rest,
  };
};

// Hook to update user profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<User> & { id: string }): Promise<User> => {
      try {
        const response = await api.put<User>(`/usuarios/${userData.id}`, userData);
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Update user profile');
      }
    },
    onSuccess: (updatedUser) => {
      // Update the user in cache
      queryClient.setQueryData(queryKeys.users.detail(updatedUser.id), updatedUser);
      
      // If this is the current user, update auth cache too
      const currentUser = queryClient.getQueryData(queryKeys.auth.me) as User;
      if (currentUser && currentUser.id === updatedUser.id) {
        queryClient.setQueryData(queryKeys.auth.me, updatedUser);
      }
      
      // Invalidate users list
      invalidateQueries.user(updatedUser.id);
    },
  });
};

// Hook to upload profile picture
export const useUploadProfilePic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { userId: string; url: string; name: string }): Promise<ProfilePic> => {
      try {
        const response = await api.post<ProfilePic>('/profile-pic', data);
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Upload profile picture');
      }
    },
    onSuccess: (newProfilePic) => {
      // Update profile pics cache
      queryClient.setQueryData(queryKeys.users.profilePics(), (old: ProfilePic[] = []) => {
        const filtered = old.filter(pic => pic.userId !== newProfilePic.userId);
        return [...filtered, newProfilePic];
      });
      
      invalidateQueries.user(newProfilePic.userId);
    },
  });
};

// Hook to delete profile picture
export const useDeleteProfilePic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profilePicId: string): Promise<void> => {
      try {
        await api.delete(`/profile-pic/${profilePicId}`);
      } catch (error) {
        throw createApiError(error, 'Delete profile picture');
      }
    },
    onSuccess: (_, profilePicId) => {
      // Remove from profile pics cache
      queryClient.setQueryData(queryKeys.users.profilePics(), (old: ProfilePic[] = []) => {
        return old.filter(pic => pic.id !== profilePicId);
      });
      
      invalidateQueries.user();
    },
  });
};