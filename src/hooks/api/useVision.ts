import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';
import { createApiError } from '@/utils/errorHandler';

export interface ChallengeVerificationData {
  imageUrl: string;
  challengeDescription: string;
  challengeId: string;
  userId: string;
  useSimulation?: boolean;
}

export interface ChallengeVerificationResponse {
  success: boolean;
  confidence: number;
  analysis: string;
  provider: string;
  timestamp: Date;
  error?: string;
  challengeCompletedId?: string;
  pointsAwarded?: number;
}

export const useVerifyChallenge = () => {
  return useMutation({
    mutationFn: async (data: ChallengeVerificationData): Promise<ChallengeVerificationResponse> => {
      try {
        const response = await api.post<ChallengeVerificationResponse>('/vision/verify-challenge', data);
        return response.data;
      } catch (error) {
        throw createApiError(error, 'Verify challenge');
      }
    },
  });
};
