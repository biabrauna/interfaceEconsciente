import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { queryKeys, invalidateQueries } from '@/lib/queryClient';
import { Desafios } from '@/types';
import { createApiError } from '@/utils/errorHandler';

// Hook to get all desafios/challenges
export const useDesafios = () => {
  return useQuery({
    queryKey: queryKeys.desafios.all,
    queryFn: async (): Promise<Desafios[]> => {
      try {
        const response = await api.get<Desafios[]>('/desafios');
        return response.data;
      } catch (error) {
        // If endpoint doesn't exist (404), return empty array
        const apiError = createApiError(error, 'Get desafios');
        if (apiError.status === 404) {
          return [];
        }
        throw apiError;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - challenges don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook to get a specific desafio
export const useDesafio = (desafioId: string) => {
  return useQuery({
    queryKey: queryKeys.desafios.detail(desafioId),
    queryFn: async (): Promise<Desafios> => {
      try {
        const response = await api.get<Desafios>(`/desafios/${desafioId}`);
        return response.data;
      } catch (error) {
        throw createApiError(error, `Get desafio ${desafioId}`);
      }
    },
    enabled: !!desafioId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook to create a new desafio (admin function)
export const useCreateDesafio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (desafioData: Omit<Desafios, 'id'>): Promise<Desafios> => {
      try {
        const response = await api.post<Desafios>('/desafios', desafioData);
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Create desafio');
      }
    },
    onSuccess: (newDesafio) => {
      // Add to the list of desafios
      queryClient.setQueryData(queryKeys.desafios.all, (old: Desafios[] = []) => {
        return [...old, newDesafio];
      });
      
      // Set individual desafio data
      queryClient.setQueryData(queryKeys.desafios.detail(newDesafio.id), newDesafio);
      
      invalidateQueries.desafios();
    },
  });
};

// Hook to update a desafio (admin function)
export const useUpdateDesafio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (desafioData: Desafios): Promise<Desafios> => {
      try {
        const response = await api.put<Desafios>(`/desafios/${desafioData.id}`, desafioData);
        return response.data;
      } catch (error) {
        throw createApiError(error, `Update desafio ${desafioData.id}`);
      }
    },
    onSuccess: (updatedDesafio) => {
      // Update in the list
      queryClient.setQueryData(queryKeys.desafios.all, (old: Desafios[] = []) => {
        return old.map(desafio => 
          desafio.id === updatedDesafio.id ? updatedDesafio : desafio
        );
      });
      
      // Update individual desafio data
      queryClient.setQueryData(queryKeys.desafios.detail(updatedDesafio.id), updatedDesafio);
      
      invalidateQueries.desafios();
    },
  });
};

// Hook to delete a desafio (admin function)
export const useDeleteDesafio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (desafioId: string): Promise<void> => {
      try {
        await api.delete(`/desafios/${desafioId}`);
      } catch (error) {
        throw createApiError(error, `Delete desafio ${desafioId}`);
      }
    },
    onSuccess: (_, desafioId) => {
      // Remove from the list
      queryClient.setQueryData(queryKeys.desafios.all, (old: Desafios[] = []) => {
        return old.filter(desafio => desafio.id !== desafioId);
      });
      
      // Remove individual desafio data
      queryClient.removeQueries({ queryKey: queryKeys.desafios.detail(desafioId) });
      
      invalidateQueries.desafios();
    },
  });
};

// Hook to get filtered/searched desafios
export const useSearchDesafios = (searchTerm: string) => {
  const { data: allDesafios, ...rest } = useDesafios();
  
  const filteredDesafios = searchTerm.trim() 
    ? allDesafios?.filter(desafio => 
        desafio.desafios.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allDesafios;
  
  return {
    data: filteredDesafios,
    ...rest,
  };
};