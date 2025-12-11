import { useMemo } from 'react';
import './PasswordStrength.css';

interface PasswordStrengthProps {
  password: string;
}

interface StrengthResult {
  score: number;
  label: string;
  color: string;
  feedback: string[];
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo((): StrengthResult => {
    if (!password) {
      return { score: 0, label: '', color: '#e0e0e0', feedback: [] };
    }

    let score = 0;
    const feedback: string[] = [];

    // Comprimento
    if (password.length >= 8) score += 1;
    else feedback.push('Mínimo 8 caracteres');

    if (password.length >= 12) score += 1;

    // Letras minúsculas
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Adicione letras minúsculas');

    // Letras maiúsculas
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Adicione letras maiúsculas');

    // Números
    if (/\d/.test(password)) score += 1;
    else feedback.push('Adicione números');

    // Caracteres especiais
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('Adicione caracteres especiais (!@#$...)');

    let label = '';
    let color = '';

    if (score <= 2) {
      label = 'Fraca';
      color = '#ef4444';
    } else if (score <= 4) {
      label = 'Média';
      color = '#f59e0b';
    } else if (score <= 5) {
      label = 'Boa';
      color = '#3b82f6';
    } else {
      label = 'Forte';
      color = '#4CAF50';
    }

    return { score, label, color, feedback: feedback.slice(0, 3) };
  }, [password]);

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="password-strength-bar">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <div
            key={level}
            className={`strength-segment ${level <= strength.score ? 'active' : ''}`}
            style={{
              backgroundColor: level <= strength.score ? strength.color : '#e0e0e0',
            }}
          />
        ))}
      </div>

      <div className="password-strength-info">
        <span className="strength-label" style={{ color: strength.color }}>
          {strength.label}
        </span>
        {strength.feedback.length > 0 && (
          <ul className="strength-feedback">
            {strength.feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
