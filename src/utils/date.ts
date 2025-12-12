/**
 * Utilitários para manipulação de datas
 */

/**
 * Formata uma data em formato relativo (ex: "5 min", "2h", "3d")
 */
export function formatRelativeDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Agora';
  if (diffInMinutes < 60) return `${diffInMinutes} min`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays === 1) return 'Ontem';
  if (diffInDays < 7) return `${diffInDays}d`;

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

/**
 * Formata uma data para o formato YYYY-MM-DD (usado em inputs type="date")
 */
export function formatDateForInput(dateString: string | Date | null): string {
  if (!dateString) return '';

  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

  if (isNaN(date.getTime())) return '';

  return date.toISOString().split('T')[0];
}

/**
 * Calcula a idade a partir de uma data de nascimento
 */
export function calculateAge(birthDate: string | Date): number {
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

/**
 * Formata uma data no formato brasileiro (dd/mm/yyyy)
 */
export function formatBrazilianDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('pt-BR');
}

/**
 * Formata uma data completa com hora (dd/mm/yyyy às HH:mm)
 */
export function formatFullDateTime(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('pt-BR') + ' às ' +
         date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
