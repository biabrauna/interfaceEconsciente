import { ValidationError } from '@/types';

export class ValidationUtils {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push('A senha deve ter pelo menos 6 caracteres');
    }
    
    // if (!/(?=.*[a-z])/.test(password)) {
    //   errors.push('A senha deve conter pelo menos uma letra minúscula');
    // }
    
    // if (!/(?=.*[A-Z])/.test(password)) {
    //   errors.push('A senha deve conter pelo menos uma letra maiúscula');
    // }
    
    // if (!/(?=.*\d)/.test(password)) {
    //   errors.push('A senha deve conter pelo menos um número');
    // }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateAge(age: string): boolean {
    const ageNum = parseInt(age, 10);
    return !isNaN(ageNum) && ageNum >= 13 && ageNum <= 120;
  }

  static validateName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 50;
  }

  static validateRequired(value: string, fieldName: string): void {
    if (!value?.trim()) {
      throw new ValidationError(`${fieldName} é obrigatório`);
    }
  }

  static validateLoginForm(email: string, password: string): void {
    this.validateRequired(email, 'E-mail');
    this.validateRequired(password, 'Senha');
    
    if (!this.validateEmail(email)) {
      throw new ValidationError('Digite um e-mail válido');
    }
  }

  static validateRegisterForm(data: {
    name: string;
    email: string;
    age: string;
    password: string;
    confirmPassword: string;
  }): void {
    this.validateRequired(data.name, 'Nome');
    this.validateRequired(data.email, 'E-mail');
    this.validateRequired(data.age, 'Idade');
    this.validateRequired(data.password, 'Senha');
    this.validateRequired(data.confirmPassword, 'Confirmação de senha');

    if (!this.validateName(data.name)) {
      throw new ValidationError('Nome deve ter entre 2 e 50 caracteres');
    }

    if (!this.validateEmail(data.email)) {
      throw new ValidationError('Digite um e-mail válido');
    }

    if (!this.validateAge(data.age)) {
      throw new ValidationError('Idade deve ser um número entre 13 e 120 anos');
    }

    const passwordValidation = this.validatePassword(data.password);
    if (!passwordValidation.isValid) {
      throw new ValidationError(passwordValidation.errors[0]);
    }

    if (data.password !== data.confirmPassword) {
      throw new ValidationError('As senhas devem ser iguais');
    }
  }
}