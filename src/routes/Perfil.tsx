import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import './style.css'
import { useMyConquistas } from "@/hooks/api/useConquistas";
import { useMe } from "@/hooks/api/useAuth";
import { useUser, useUserProfilePic } from "@/hooks/api/useUsers";

export default function Perfil(){
    const navigate = useNavigate();
    const defaultUrl = 'https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png';

    // Usar React Query para buscar dados do usuário logado
    const { data: currentUser, isLoading: loadingMe } = useMe();
    const userId = currentUser?.id;

    // Buscar dados completos do usuário
    const { data: usersInfo, isLoading: loadingUserInfo } = useUser(userId || '');

    // Buscar foto de perfil do usuário
    const { data: userProfilePic, isLoading: loadingProfilePic } = useUserProfilePic(userId || '');

    // Buscar conquistas
    const { data: conquistas = [], isLoading: loadingConquistas } = useMyConquistas();

    // Determinar URL da foto de perfil
    const url = userProfilePic?.url || defaultUrl;
    const name = userProfilePic?.name || usersInfo?.name || currentUser?.name || '';

    // Loading state combinado
    const isLoading = loadingMe || loadingUserInfo || loadingProfilePic;

    // Show loading state
    if (isLoading) {
        return (
            <div className="perfil-page">
                <Navbar />
                <div className="perfil-content" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh'
                }}>
                    <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                        <p>Carregando perfil...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return(
        <div className="perfil-page">
            <Navbar />

            <div className="perfil-content">
                <div className="profile-header-card">
                    <div className="profile-avatar-container">
                        <div className="profile-avatar-border">
                            <img className="profile-avatar" src={url} alt="Profile"/>
                        </div>
                        <div className="profile-badge-verified">
                            <img style={{width: "28px", height: "28px"}} src="https://res.cloudinary.com/dnulz0tix/image/upload/v1733802264/lydf03q1ootluvobgb7c.png" alt="Verified"/>
                        </div>
                    </div>

                    <h2 className="profile-name">{name}</h2>

                    <div className="profile-stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">👥</div>
                            <div className="stat-value">{usersInfo.seguidores || 0}</div>
                            <div className="stat-label">Seguidores</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🤝</div>
                            <div className="stat-value">{usersInfo.seguindo || 0}</div>
                            <div className="stat-label">Seguindo</div>
                        </div>
                        <div className="stat-card stat-card-highlight">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-value">{usersInfo.pontos || 0}</div>
                            <div className="stat-label">Pontos</div>
                        </div>
                    </div>
                </div>

                <div className="profile-bio-card">
                    <div className="bio-header">
                        <span className="bio-icon">✨</span>
                        <h3 className="bio-title">Sobre mim</h3>
                    </div>
                    <p className="bio-text">
                        {usersInfo.biografia || "Usuário consciente fazendo a diferença! 🌱"}
                    </p>
                </div>

                <div className="profile-achievements">
                    <h3 className="achievements-title">
                        <span>🏆</span> Conquistas Ecológicas
                    </h3>

                    {loadingConquistas ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>
                            ⏳ Carregando conquistas...
                        </div>
                    ) : conquistas.length > 0 ? (
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
                            title="Nenhuma conquista ainda"
                            description="Complete desafios ecológicos para desbloquear conquistas e ganhar pontos!"
                            actionLabel="Ver Desafios"
                            onAction={() => navigate('/Home')}
                        />
                    )}
                </div>
            </div>

            <Footer/>
        </div>
    )
}
