import { useIsFollowing, useFollowUser, useUnfollowUser } from '@/hooks/api/useFollow';
import { showToast } from '@/lib/toast';

interface FollowButtonProps {
  userId: string;
  onFollowChange?: (isFollowing: boolean) => void;
}

export default function FollowButton({ userId, onFollowChange }: FollowButtonProps) {
  const { data: isFollowing, isLoading, isError } = useIsFollowing(userId);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  const handleClick = async () => {
    // Previne cliques duplos enquanto a requisição está em andamento
    if (isPending) return;

    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(userId);
        onFollowChange?.(false);
        showToast.success('Você deixou de seguir este usuário');
      } else {
        await followMutation.mutateAsync(userId);
        onFollowChange?.(true);
        showToast.success('Você está seguindo este usuário');
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Erro ao processar solicitação';
      showToast.error(message);
      console.error('Erro ao seguir/deixar de seguir:', error);
    }
  };

  // Se houver erro ao carregar status, não renderiza o botão
  if (isError) {
    return null;
  }

  const isPending = followMutation.isPending || unfollowMutation.isPending;

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || isPending}
      style={{
        padding: '8px 20px',
        borderRadius: '20px',
        border: isFollowing ? '1px solid #4CAF50' : 'none',
        background: isFollowing ? 'white' : '#4CAF50',
        color: isFollowing ? '#4CAF50' : 'white',
        fontWeight: '600',
        fontSize: '14px',
        cursor: isPending ? 'not-allowed' : 'pointer',
        opacity: isPending ? 0.6 : 1,
        transition: 'all 0.2s',
      }}
    >
      {isPending ? '...' : isFollowing ? 'Seguindo' : 'Seguir'}
    </button>
  );
}
