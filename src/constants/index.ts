/**
 * Constantes da aplicação
 */

// URLs padrão de imagens
export const DEFAULT_PROFILE_IMAGE = 'https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png';

// Cloudinary
export const CLOUDINARY_CONFIG = {
  cloudName: 'dnulz0tix',
  uploadPreset: 'tonmaj4q',
  apiUrl: 'https://api.cloudinary.com/v1_1/dnulz0tix/image/upload',
  baseUrl: 'https://res.cloudinary.com/dnulz0tix/image/upload',
} as const;

// Limites de arquivo
export const FILE_LIMITS = {
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxImageSizeMB: 5,
  acceptedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
} as const;

// Tempos de cache (em milissegundos)
export const CACHE_TIMES = {
  oneMinute: 1000 * 60,
  fiveMinutes: 1000 * 60 * 5,
  tenMinutes: 1000 * 60 * 10,
  fifteenMinutes: 1000 * 60 * 15,
  thirtyMinutes: 1000 * 60 * 30,
  oneHour: 1000 * 60 * 60,
} as const;

// Mensagens padrão
export const MESSAGES = {
  success: {
    profileUpdated: 'Perfil atualizado com sucesso!',
    photoPosted: 'Foto postada com sucesso! 🎉',
    followed: 'Você está seguindo este usuário',
    unfollowed: 'Você deixou de seguir este usuário',
    logoutSuccess: 'Logout realizado com sucesso',
  },
  error: {
    loadProfile: 'Erro ao carregar dados do perfil',
    updateProfile: 'Erro ao atualizar perfil. Tente novamente.',
    uploadImage: 'Erro no upload da imagem',
    unauthorized: 'Usuário não autenticado',
    networkError: 'Erro de conexão. Verifique sua internet.',
  },
  validation: {
    selectFile: 'Por favor, selecione um arquivo para upload.',
    imageOnly: 'Por favor, selecione apenas arquivos de imagem (JPG, PNG, WebP).',
    fileTooLarge: 'Arquivo muito grande. Máximo permitido: 5MB.',
  },
} as const;

// Regex patterns
export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
} as const;
