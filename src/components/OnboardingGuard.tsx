import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOnboardingStatus } from '@/hooks/api/useOnboarding';

interface OnboardingGuardProps {
  children: React.ReactNode;
}

const LoadingSpinner: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
    color: '#666',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  }}>
    <div style={{
      width: '60px',
      height: '60px',
      border: '6px solid rgba(255, 255, 255, 0.3)',
      borderTop: '6px solid #fff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }} />
    <span style={{ color: '#fff', fontSize: '16px' }}>Verificando onboarding...</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const OnboardingRequired: React.FC = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  }}>
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '40px',
      maxWidth: '500px',
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    }}>
      <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌱</div>
      <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#333' }}>
        Complete seu Onboarding!
      </h2>
      <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
        Para começar a usar o EcoNsciente, você precisa completar algumas etapas simples:
      </p>
      <ul style={{ textAlign: 'left', color: '#666', marginBottom: '24px' }}>
        <li style={{ marginBottom: '12px' }}>📸 Adicionar foto de perfil (+100 pontos)</li>
        <li style={{ marginBottom: '12px' }}>✍️ Escrever sua biografia (+50 pontos)</li>
        <li style={{ marginBottom: '12px' }}>🎯 Completar seu primeiro desafio (+200 pontos)</li>
      </ul>
      <p style={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: '24px' }}>
        🎁 Bônus: +50 pontos ao completar tudo!
      </p>
      <a
        href="/EditarPerfil"
        style={{
          display: 'inline-block',
          padding: '14px 32px',
          background: '#4CAF50',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '16px',
          transition: 'background 0.3s',
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#45a049'}
        onMouseOut={(e) => e.currentTarget.style.background = '#4CAF50'}
      >
        Começar Agora →
      </a>
    </div>
  </div>
);

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const { data: onboardingStatus, isLoading } = useOnboardingStatus();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If onboarding is not completed, show the required screen
  if (onboardingStatus && !onboardingStatus.completed) {
    return <OnboardingRequired />;
  }

  return <>{children}</>;
}
