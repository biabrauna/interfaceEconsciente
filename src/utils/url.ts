/**
 * Utilitários para manipulação de URLs
 */

import { DEFAULT_PROFILE_IMAGE } from '@/constants';

/**
 * Valida se uma string é uma URL válida
 */
export function isValidUrl(url: string | undefined): boolean {
  if (!url || url.trim() === '') return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida se uma URL é uma imagem válida
 * Se não for válida, retorna a imagem padrão
 */
export function validateImageUrl(url: string | undefined, fallback: string = DEFAULT_PROFILE_IMAGE): string {
  return isValidUrl(url) ? url! : fallback;
}

/**
 * Extrai o ID público de uma URL do Cloudinary
 */
export function extractCloudinaryPublicId(url: string): string | null {
  const match = url.match(/upload\/(?:v\d+\/)?([^/]+)\.[^.]+$/);
  return match ? match[1] : null;
}
