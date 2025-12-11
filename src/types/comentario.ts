export interface Comentario {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  texto: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateComentarioData {
  postId: string;
  userId: string;
  userName: string;
  texto: string;
}
