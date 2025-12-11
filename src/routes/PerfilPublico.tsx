import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FollowButton from "../components/FollowButton";
import EmptyState from "../components/EmptyState";
import { showToast } from "@/lib/toast";
import api from "../services/api";
import './style.css';
import { User } from "@/types";
import { useMyConquistas } from "@/hooks/api/useConquistas";

export default function PerfilPublico() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const defaultProfilePic = 'https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png';
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [conquistas, setConquistas] = useState<any[]>([]);

  // Validar URL
  const isValidUrl = (url: string | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const me = await api.get('/auth/me');
        setCurrentUserId(me.data.id);

        // Se o usuário está vendo seu próprio perfil, redireciona para /Perfil
        if (me.data.id === userId) {
          navigate('/Perfil', { replace: true });
          return;
        }
      } catch (error: any) {
        console.error('Erro ao buscar usuário atual:', error);
        const errorMsg = error?.response?.data?.message || 'Erro ao verificar autenticação';
        showToast.error(errorMsg);
      }
    };

    if (userId) {
      fetchCurrentUser();
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        setLoading(true);

        // Buscar informações do usuário
        const userResponse = await api.get(`/usuarios/${userId}`);
        setUserInfo(userResponse.data);
        setName(userResponse.data.name);

        // Buscar foto de perfil
        try {
          const profilePicResponse = await api.get('/profile-pic');
          const matchingProfilePic = profilePicResponse.data.find(
            (pic: any) => pic.userId === userId
          );

          if (matchingProfilePic) {
            // Validar URL antes de setar
            const picUrl = matchingProfilePic.url;
            if (isValidUrl(picUrl)) {
              setProfilePic(picUrl);
            } else {
              setProfilePic(defaultProfilePic);
            }
            setName(matchingProfilePic.name || userResponse.data.name);
          }
        } catch (error) {
          // Silenciar erro, foto de perfil é opcional
        }

        // Buscar conquistas do usuário
        try {
          const conquistasResponse = await api.get(`/conquistas/user/${userId}`);
          setConquistas(conquistasResponse.data || []);
        } catch (error) {
          // Silenciar erro, conquistas são opcionais
          setConquistas([]);
        }

        setLoading(false);
      } catch (error: any) {
        console.error('Erro ao buscar dados do perfil:', error);
        const errorMsg = error?.response?.data?.message || 'Erro ao carregar perfil';
        showToast.error(errorMsg);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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
          {currentUserId && currentUserId !== userId && (
            <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <FollowButton
                userId={userId!}
                onFollowChange={(isFollowing) => {
                  // Atualiza contadores localmente para feedback imediato
                  setUserInfo(prev => prev ? {
                    ...prev,
                    seguidores: isFollowing ? prev.seguidores + 1 : prev.seguidores - 1
                  } : null);
                }}
              />
            </div>
          )}

          <div className="profile-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{userInfo.seguidores || 0}</div>
              <div className="stat-label">Seguidores</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🤝</div>
              <div className="stat-value">{userInfo.seguindo || 0}</div>
              <div className="stat-label">Seguindo</div>
            </div>
            <div className="stat-card stat-card-highlight">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{userInfo.pontos || 0}</div>
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
            {userInfo.biografia || "Usuário consciente fazendo a diferença! 🌱"}
          </p>
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
