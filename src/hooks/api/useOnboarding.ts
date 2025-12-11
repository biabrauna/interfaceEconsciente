import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingService } from '@/services/onboarding';

export function useOnboardingStatus() {
  const hasToken = !!localStorage.getItem('token');

  console.log('[useOnboardingStatus] Hook executado:', {
    hasToken,
    enabled: hasToken
  });

  return useQuery({
    queryKey: ['onboarding', 'status'],
    queryFn: () => {
      console.log('[useOnboardingStatus] QueryFn executada');
      return onboardingService.getStatus();
    },
    enabled: hasToken, // Só executa se tiver token
    staleTime: 1000 * 10, // 10 segundos - cache curto para refletir mudanças rapidamente
    refetchOnWindowFocus: true, // Refaz query ao voltar para o app
  });
}

export function useCompleteOnboardingStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (step: 'profilePic' | 'bio' | 'firstChallenge') =>
      onboardingService.completeStep(step),
    onSuccess: () => {
      // Invalida onboarding status
      queryClient.invalidateQueries({ queryKey: ['onboarding'] });

      // Invalida queries de usuários para atualizar pontos
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] }); // Usuário atual
    },
  });
}
