import api from './api';

export interface OnboardingSteps {
  profilePic: boolean;
  bio: boolean;
  firstChallenge: boolean;
}

export interface OnboardingStatus {
  completed: boolean;
  steps: OnboardingSteps;
  totalPoints: number;
}

export const onboardingService = {
  async getStatus(): Promise<OnboardingStatus> {
    const response = await api.get('/onboarding/status');
    return response.data;
  },

  async completeStep(step: 'profilePic' | 'bio' | 'firstChallenge'): Promise<OnboardingStatus> {
    const response = await api.post('/onboarding/complete-step', { step });
    return response.data;
  },
};
