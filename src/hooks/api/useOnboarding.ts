import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { onboardingService } from '@/services/onboarding';

export function useOnboardingStatus() {
  return useQuery({
    queryKey: ['onboarding', 'status'],
    queryFn: () => onboardingService.getStatus(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useCompleteOnboardingStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (step: 'profilePic' | 'bio' | 'firstChallenge') =>
      onboardingService.completeStep(step),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
