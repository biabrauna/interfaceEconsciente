export interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  tipo: 'desafios' | 'pontos' | 'social' | 'perfil';
  pontosRecompensa: number;
  desbloqueada?: boolean;
  desbloqueadaEm?: string;
}

export interface CreateConquistaDto {
  nome: string;
  descricao: string;
  icone: string;
  tipo: string;
  criterio: string;
  pontosRecompensa: number;
}
