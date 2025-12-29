import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { useFeed, useLikePost, useUnlikePost } from '@/hooks/api/usePosts';
import { useAuth } from '@/hooks/useAuth';
import './Posts.css';

export default function Posts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useFeed(user?.id || '', page, limit);
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();

  const handleLike = (postId: string, isLiked: boolean) => {
    if (!user?.id) return;

    if (isLiked) {
      unlikeMutation.mutate({ postId, userId: user.id });
    } else {
      likeMutation.mutate({ postId, userId: user.id });
    }
  };

  const handleNextPage = () => {
    const meta = (data as any)?.meta;
    if (meta?.hasNextPage) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    const meta = (data as any)?.meta;
    if (meta?.hasPreviousPage) {
      setPage((prev) => Math.max(1, prev - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="posts-page">
      <Navbar />

      <div className="posts-container">
        <div className="posts-header">
          <div className="posts-header-content">
            <div>
              <h1 className="posts-title">
                <span className="posts-icon">📸</span>
                Feed Ecológico
              </h1>
              <p className="posts-subtitle">
                Compartilhe suas ações sustentáveis e inspire outros!
              </p>
            </div>
            <button
              className="create-post-button"
              onClick={() => navigate('/Home')}
              title="Completar desafio e criar post"
            >
              <span className="create-post-icon">➕</span>
              <span className="create-post-text">Postar Desafio</span>
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="posts-loading">
            <div className="loading-spinner"></div>
            <p>Carregando posts...</p>
          </div>
        )}

        {isError && (
          <div className="posts-error">
            <span className="error-icon">⚠️</span>
            <p>Erro ao carregar posts: {error?.message || 'Tente novamente mais tarde'}</p>
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            <div className="posts-grid">
              {(() => {
                const posts = (data as any)?.data || data;
                const postsArray = Array.isArray(posts) ? posts : [];

                return postsArray.length > 0 ? (
                  postsArray.map((post: any) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                    />
                  ))
                ) : (
                  <div className="posts-empty">
                    <span className="empty-icon">🌱</span>
                    <h3>Nenhum post ainda</h3>
                    <p>Seja o primeiro a compartilhar uma ação sustentável!</p>
                  </div>
                );
              })()}
            </div>

            {(() => {
              const posts = (data as any)?.data || data;
              const postsArray = Array.isArray(posts) ? posts : [];
              const meta = (data as any)?.meta;

              return postsArray.length > 0 && meta && (
                <div className="posts-pagination">
                  <button
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={!meta.hasPreviousPage}
                  >
                    ← Anterior
                  </button>

                  <div className="pagination-info">
                    Página {meta.page || 1} de {meta.totalPages || 1}
                    <span className="pagination-total">
                      ({meta.total || postsArray.length} posts)
                    </span>
                  </div>

                  <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={!meta.hasNextPage}
                  >
                    Próxima →
                  </button>
                </div>
              );
            })()}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
