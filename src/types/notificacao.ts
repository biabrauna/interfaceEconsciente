export interface Notificacao {
  id: string;
  userId: string;
  tipo: 'conquista' | 'seguidor' | 'like' | 'comentario';
  titulo: string;
  mensagem: string;
  lida: boolean;
  metadata?: string;
  createdAt: string;
}

export interface NotificacaoMetadata {
  conquistaId?: string;
  followerId?: string;
  postId?: string;
  likerId?: string;
}
