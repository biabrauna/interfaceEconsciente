/**
 * Gerenciador centralizado de tokens JWT
 * Sincroniza token localStorage com estado da aplicação
 */

const TOKEN_KEY = 'token';

export class TokenManager {
  /**
   * Armazena token JWT no localStorage
   */
  static setToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      console.log('[TokenManager] Token JWT armazenado');
    } catch (error) {
      console.error('[TokenManager] Erro ao armazenar token:', error);
      throw new Error('Falha ao armazenar token de autenticação');
    }
  }

  /**
   * Recupera token JWT do localStorage
   */
  static getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('[TokenManager] Erro ao recuperar token:', error);
      return null;
    }
  }

  /**
   * Remove token JWT do localStorage
   */
  static clearToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
      console.log('[TokenManager] Token JWT removido');
    } catch (error) {
      console.error('[TokenManager] Erro ao remover token:', error);
    }
  }

  /**
   * Verifica se existe um token válido
   */
  static hasToken(): boolean {
    const token = this.getToken();
    return !!token && token.length > 0;
  }

  /**
   * Verifica se o token está expirado (decodifica JWT payload)
   */
  static isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decodifica payload do JWT (parte do meio)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // exp em segundos, converter para ms
      const currentTime = Date.now();

      const isExpired = currentTime >= expirationTime;
      if (isExpired) {
        console.warn('[TokenManager] Token JWT expirado');
        this.clearToken();
      }

      return isExpired;
    } catch (error) {
      console.error('[TokenManager] Erro ao decodificar token:', error);
      // Se não conseguir decodificar, considera expirado
      this.clearToken();
      return true;
    }
  }

  /**
   * Extrai informações do payload do token
   */
  static getTokenPayload(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('[TokenManager] Erro ao extrair payload do token:', error);
      return null;
    }
  }

  /**
   * Valida sincronização entre token e backend
   * Retorna true se token existe e não está expirado
   */
  static isValid(): boolean {
    return this.hasToken() && !this.isTokenExpired();
  }
}
