import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { queryKeys, invalidateQueries } from '@/lib/queryClient';
import { User } from '@/types';
import { createApiError } from '@/utils/errorHandler';

// Interface for profile picture
export interface ProfilePic {
  id: string;
  userId: string;
  url: string;
  name: string;
}

// Hook to get all users (for ranking)
export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: async (): Promise<User[]> => {
      try {
        const response = await api.get<User[]>('/users');
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
        const response = await api.get<User>(`/users/${userId}`);
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
  return useQuery({
    queryKey: queryKeys.users.profilePics(),

    queryFn: async (): Promise<ProfilePic[]> => {
      try {
        const response = await api.get<ProfilePic[]>('/profilePic');
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Get profile pictures');
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get a specific user's profile picture
export const useUserProfilePic = (userId: string) => {
  const { data: profilePics, ...rest } = useProfilePics();
  
  const userProfilePic = profilePics?.find(pic => pic.userId === userId);
  
  return {
    data: userProfilePic,
    ...rest,
  };
};

// Hook to update user profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Partial<User> & { id: string }): Promise<User> => {
      try {
        const response = await api.put<User>(`/users/${userData.id}`, userData);
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
        const response = await api.post<ProfilePic>('/profilePic', data);
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
        await api.delete(`/profilePic/${profilePicId}`);
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