import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStatus } from '@/hooks/api/useOnboarding';
import './OnboardingStyle.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { data: onboardingStatus, isLoading } = useOnboardingStatus();

  useEffect(() => {
    // Verifica localStorage para não mostrar novamente
    const onboardingShown = localStorage.getItem('onboarding_shown');
    const fromOnboarding = sessionStorage.getItem('from_onboarding');

    if (!isLoading && onboardingStatus) {
      // Se já completou o onboarding E não veio de uma ação do onboarding
      if (onboardingStatus.completed && fromOnboarding !== 'true') {
        return;
      }

      // Se foi pulado (shown = true) E não veio de uma ação do onboarding
      if (onboardingShown === 'true' && fromOnboarding !== 'true') {
        return;
      }

      // Mostra o onboarding
      setIsVisible(true);
    }
  }, [isLoading, onboardingStatus]);

  if (isLoading || !isVisible) {
    return null;
  }

  const steps = [
    {
      title: 'Bem-vindo ao EcoNsciente! 🌱',
      description: 'Faça a diferença no planeta e ganhe pontos por suas ações sustentáveis!',
      icon: '🌍',
      action: null,
    },
    {
      title: 'Configure seu Perfil 📸',
      description: 'Adicione uma foto de perfil e ganhe +100 pontos!',
      icon: '👤',
      action: () => navigate('/EditarPerfil'),
      points: 100,
    },
    {
      title: 'Conte sua História ✍️',
      description: 'Adicione uma biografia e ganhe +50 pontos!',
      icon: '📝',
      action: () => navigate('/EditarPerfil'),
      points: 50,
    },
    {
      title: 'Complete seu Primeiro Desafio 🎯',
      description: 'Realize um desafio ecológico e ganhe +200 pontos!',
      icon: '🚀',
      action: () => navigate('/Home'),
      points: 200,
    },
    {
      title: 'Tudo Pronto! 🎉',
      description: 'Você está pronto para começar sua jornada sustentável. Ganhe +50 pontos bônus ao completar tudo!',
      icon: '🏆',
      action: null,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem('onboarding_shown', 'true');
    setIsVisible(false);
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleAction = () => {
    const step = steps[currentStep];
    if (step.action) {
      // Marcar que veio do onboarding
      if (currentStep === 1 || currentStep === 2) {
        // Passos de editar perfil
        sessionStorage.setItem('from_onboarding', 'true');
      }
      // Não fechar o onboarding, apenas ocultar temporariamente
      setIsVisible(false);
      step.action();
    } else {
      handleNext();
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        {/* Botão de fechar */}
        <button className="onboarding-close" onClick={handleClose} aria-label="Fechar">
          ✕
        </button>

        {/* Barra de progresso */}
        <div className="onboarding-progress-container">
          <div className="onboarding-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {/* Conteúdo */}
        <div className="onboarding-content">
          <div className="onboarding-icon">{currentStepData.icon}</div>
          <h2 className="onboarding-title">{currentStepData.title}</h2>
          <p className="onboarding-description">{currentStepData.description}</p>

          {currentStepData.points && (
            <div className="onboarding-points">
              <span className="onboarding-points-icon">⭐</span>
              <span className="onboarding-points-value">+{currentStepData.points} pontos</span>
            </div>
          )}

          {/* Indicadores de passos */}
          <div className="onboarding-indicators">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`onboarding-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Botões de navegação */}
        <div className="onboarding-actions">
          <button
            className="onboarding-btn onboarding-btn-skip"
            onClick={handleSkip}
          >
            Pular
          </button>

          <div className="onboarding-nav-buttons">
            {currentStep > 0 && (
              <button
                className="onboarding-btn onboarding-btn-secondary"
                onClick={handlePrevious}
              >
                ← Voltar
              </button>
            )}

            <button
              className="onboarding-btn onboarding-btn-primary"
              onClick={handleAction}
            >
              {currentStep === steps.length - 1
                ? 'Começar! 🚀'
                : currentStepData.action
                  ? 'Ir para lá →'
                  : 'Próximo →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
