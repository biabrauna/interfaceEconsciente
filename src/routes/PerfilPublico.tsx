import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FollowButton from "../components/FollowButton";
import EmptyState from "../components/EmptyState";
import PostCard from "../components/PostCard";
import './style.css';
import { useMe } from "@/hooks/api/useAuth";
import { useUser, useUserProfilePic } from "@/hooks/api/useUsers";
import { useUserPosts } from "@/hooks/api/usePosts";
import { useQuery } from '@tanstack/react-query';
import api from "../services/api";

interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
}

export default function PerfilPublico() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const defaultProfilePic = 'https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png';

  // Buscar usuário logado
  const { data: currentUser } = useMe();

  // Redirecionar se o usuário está vendo seu próprio perfil
  useEffect(() => {
    if (currentUser?.id && currentUser.id === userId) {
      navigate('/Perfil', { replace: true });
    }
  }, [currentUser, userId, navigate]);

  // Buscar dados do usuário público
  const { data: userInfo, isLoading: loadingUser } = useUser(userId || '');

  // Buscar foto de perfil
  const { data: userProfilePic } = useUserProfilePic(userId || '');

  // Buscar conquistas do usuário com React Query
  const { data: conquistas = [], isLoading: loadingConquistas } = useQuery<Conquista[]>({
    queryKey: ['conquistas', 'user', userId],
    queryFn: async (): Promise<Conquista[]> => {
      try {
        const response = await api.get<Conquista[]>(`/conquistas/user/${userId}`);
        return response.data || [];
      } catch (error) {
        return [];
      }
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Buscar posts do usuário
  const { data: postsData, isLoading: loadingPosts } = useUserPosts(userId || '', 1, 20);

  // Determinar valores a exibir
  const profilePic = userProfilePic?.url || defaultProfilePic;
  const name = userProfilePic?.name || userInfo?.name || '';
  const loading = loadingUser || loadingConquistas;
  const userPosts = postsData?.data || [];

  // Contadores com valores padrão seguros
  const seguidoresCount = userInfo?.seguidores || 0;
  const seguindoCount = userInfo?.seguindo || 0;
  const pontosCount = userInfo?.pontos || 0;

  if (loading) {
    return (
      <div className="perfil-page">
        <Navbar />
        <div className="perfil-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <p style={{ color: 'white', fontSize: '1.2rem' }}>⏳ Carregando perfil...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="perfil-page">
        <Navbar />
        <div className="perfil-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <p style={{ color: '#ff6b6b', fontSize: '1.2rem' }}>⚠️ Usuário não encontrado</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="perfil-page">
      <Navbar />

      <div className="perfil-content">
        <div className="profile-header-card">
          <div className="profile-avatar-container">
            <div className="profile-avatar-border">
              <img className="profile-avatar" src={profilePic} alt="Profile" />
            </div>
            <div className="profile-badge-verified">
              <img
                style={{ width: "28px", height: "28px" }}
                src="https://res.cloudinary.com/dnulz0tix/image/upload/v1733802264/lydf03q1ootluvobgb7c.png"
                alt="Verified"
              />
            </div>
          </div>

          <h2 className="profile-name">{name}</h2>

          {/* Botão de seguir/deixar de seguir */}
          {currentUser?.id && currentUser.id !== userId && (
            <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <FollowButton userId={userId!} />
            </div>
          )}

          <div className="profile-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{seguidoresCount}</div>
              <div className="stat-label">Seguidores</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🤝</div>
              <div className="stat-value">{seguindoCount}</div>
              <div className="stat-label">Seguindo</div>
            </div>
            <div className="stat-card stat-card-highlight">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{pontosCount}</div>
              <div className="stat-label">Pontos</div>
            </div>
          </div>
        </div>

        <div className="profile-bio-card">
          <div className="bio-header">
            <span className="bio-icon">✨</span>
            <h3 className="bio-title">Sobre</h3>
          </div>
          <p className="bio-text">
            {userInfo?.biografia || "Usuário consciente fazendo a diferença! 🌱"}
          </p>
        </div>

        <div className="profile-achievements">
          <h3 className="achievements-title">
            <span>📸</span> Posts
          </h3>

          {loadingPosts ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>
              ⏳ Carregando posts...
            </div>
          ) : userPosts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem'
            }}>
              {userPosts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="📸"
              title="Nenhum post ainda"
              description={`${name} ainda não compartilhou nenhum post.`}
            />
          )}
        </div>

        <div className="profile-achievements">
          <h3 className="achievements-title">
            <span>🏆</span> Conquistas Ecológicas
          </h3>

          {conquistas.length > 0 ? (
            <div className="achievements-grid">
              {conquistas.map((conquista) => (
                <div
                  key={conquista.id}
                  className={`achievement-badge ${!conquista.desbloqueada ? 'locked' : ''}`}
                  title={conquista.descricao}
                >
                  <div className="achievement-icon">{conquista.icone}</div>
                  <div className="achievement-name">{conquista.nome}</div>
                  {conquista.desbloqueada && (
                    <div style={{ fontSize: '10px', color: '#4CAF50', marginTop: '4px' }}>
                      ✓ Desbloqueada
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🏆"
              title="Sem conquistas ainda"
              description={`${name} ainda não desbloqueou nenhuma conquista.`}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
