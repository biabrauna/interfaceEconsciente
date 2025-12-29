import { Post } from '@/hooks/api/usePosts';
import { useUserProfilePic } from '@/hooks/api';
import { useAuth } from '@/hooks/useAuth';
import ComentariosSection from './ComentariosSection';
import './PostCard.css';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string, isLiked: boolean) => void;
}

export default function PostCard({ post, onLike }: PostCardProps) {
  const { user } = useAuth();
  const { data: userProfilePic } = useUserProfilePic(post.userId);

  const defaultUrl = 'https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png';
  // Validar se a URL é válida
  const isValidUrl = (url: string | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const profileUrl = isValidUrl(userProfilePic?.url) ? userProfilePic.url : defaultUrl;
  const postImageUrl = isValidUrl(post.url) ? post.url : defaultUrl;
  const userName = post.user?.name || userProfilePic?.name || 'Usuário';

  // Check if current user has liked this post
  const isLiked = post.userLikes?.some(like => like.userId === user?.id) || false;

  const handleLike = () => {
    if (onLike) {
      onLike(post.id, isLiked);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `Há ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
      return `Há ${diffInHours}h`;
    } else if (diffInDays === 1) {
      return 'Ontem';
    } else if (diffInDays < 7) {
      return `Há ${diffInDays} dias`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
      });
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={profileUrl}
          alt={userName}
          className="post-avatar"
        />
        <div className="post-user-info">
          <span className="post-username">{userName}</span>
          <span className="post-time">{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="post-image-container">
        <img
          src={postImageUrl}
          alt="Post"
          className="post-image"
          loading="lazy"
          onError={(e) => {
            // Fallback se a imagem falhar ao carregar
            (e.target as HTMLImageElement).src = defaultUrl;
          }}
        />
      </div>

      <div className="post-actions">
        <button
          className={`post-like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Descurtir' : 'Curtir'}
        >
          <span className="like-icon">{isLiked ? '❤️' : '🤍'}</span>
          <span className="like-count">{post.likes}</span>
        </button>
      </div>

      <ComentariosSection postId={post.id} />
    </div>
  );
}
