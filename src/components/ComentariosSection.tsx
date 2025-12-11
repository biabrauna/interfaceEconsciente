import { useState } from 'react';
import { useComentariosByPost, useCreateComentario, useDeleteComentario } from '@/hooks/api/useComentarios';
import { useAuth } from '@/hooks/useAuth';
import './ComentariosSection.css';

interface ComentariosSectionProps {
  postId: string;
}

export default function ComentariosSection({ postId }: ComentariosSectionProps) {
  const { user } = useAuth();
  const [texto, setTexto] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: comentarios = [], isLoading } = useComentariosByPost(postId);
  const createMutation = useCreateComentario();
  const deleteMutation = useDeleteComentario();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!texto.trim() || !user) return;

    createMutation.mutate(
      {
        postId,
        userId: user.id,
        userName: user.name,
        texto: texto.trim(),
      },
      {
        onSuccess: () => {
          setTexto('');
        },
      }
    );
  };

  const handleDelete = (comentarioId: string) => {
    if (!user) return;
    deleteMutation.mutate({ comentarioId, userId: user.id, postId });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
  };

  return (
    <div className="comentarios-section">
      <button
        className="comentarios-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        <span className="comentarios-icon">💬</span>
        <span className="comentarios-count">
          {comentarios.length} {comentarios.length === 1 ? 'comentário' : 'comentários'}
        </span>
        <span className={`toggle-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="comentarios-content">
          <form className="comentario-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Escreva um comentário..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={500}
              disabled={createMutation.isPending}
              className="comentario-input"
            />
            <button
              type="submit"
              className="comentario-submit"
              disabled={!texto.trim() || createMutation.isPending}
            >
              {createMutation.isPending ? '...' : 'Enviar'}
            </button>
          </form>

          <div className="comentarios-list">
            {isLoading && (
              <div className="comentarios-loading">Carregando...</div>
            )}

            {!isLoading && comentarios.length === 0 && (
              <div className="comentarios-empty">
                Seja o primeiro a comentar!
              </div>
            )}

            {!isLoading && comentarios.map((comentario) => (
              <div key={comentario.id} className="comentario-item">
                <div className="comentario-header">
                  <span className="comentario-autor">{comentario.userName}</span>
                  <span className="comentario-tempo">{formatDate(comentario.createdAt)}</span>
                </div>
                <p className="comentario-texto">{comentario.texto}</p>
                {user?.id === comentario.userId && (
                  <button
                    className="comentario-delete"
                    onClick={() => handleDelete(comentario.id)}
                    disabled={deleteMutation.isPending}
                    type="button"
                    aria-label="Deletar comentário"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
