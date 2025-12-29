import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfilePic, useUser } from '@/hooks/api';
import { createApiError } from '@/utils/errorHandler';
import { showToast } from '@/lib/toast';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState("none");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Use React Query hooks com cache automático
  const { data: userProfilePic } = useUserProfilePic(user?.id || '');
  const { data: userData } = useUser(user?.id || '');

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

  const profileUrl = isValidUrl(userProfilePic?.url) ? userProfilePic?.url : defaultUrl;
  const displayName = userProfilePic?.name || user?.name || 'Usuário';
  const userPoints = userData?.pontos || user?.pontos || 0;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => (prev === "flex" ? "none" : "flex"));
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsMenuOpen("none"); // Fecha o menu
  };

  const handleLogoutConfirm = async (): Promise<void> => {
    try {
      await logout();
      setShowLogoutModal(false);
      showToast.success('Logout realizado com sucesso');
      navigate('/');
    } catch (error: any) {
      const appError = createApiError(error, 'Logout from navbar');
      showToast.error(appError.message || 'Erro ao fazer logout');
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="nav-responsive">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="menu-hamburguer" onClick={toggleMenu}>
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
      </div>

      <div className="profile-container">
        <Link to="/Perfil">
          <div className="profile">
            <img className="profilePic" src={profileUrl} alt="Foto de perfil" />
          </div>
        </Link>

        <div className="profile-name">
          <p>Olá {displayName},</p>
          <p>⭐ {userPoints} pontos</p>
        </div>

        {/* <NotificationBell /> */}

        {/* Botão de Logout Visível */}
        <button
          onClick={handleLogoutClick}
          style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(231, 76, 60, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(231, 76, 60, 0.3)';
          }}
          title="Sair da conta"
        >
          <span>Sair</span>
        </button>

        <div className="menu-list" style={{ display: isMenuOpen }}>
          <Link to="/Home"><li>Home</li></Link>
          <div className="bar" />
          <Link to="/feed"><li>Feed de Posts</li></Link>
          <div className="bar" />
          <Link to="/EditarPerfil"><li>Editar Perfil</li></Link>
          <div className="bar" />
          <Link to="/Separacao"><li>Como Separar Resíduos</li></Link>
          <div className="bar" />
          <Link to="/Sobre"><li>Sobre o App</li></Link>
          <div className="bar" />
          <Link to="/Duvidas"><li>Dúvidas</li></Link>
          <div className="bar" />
          <button onClick={handleLogoutClick} style={{all: 'unset', cursor: 'pointer'}}><li>Sair</li></button>
          <div className="bar" />
        </div>
      </div>

      {/* Modal de Confirmação de Logout */}
      {showLogoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '16px',
            }}>
              👋
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '12px',
            }}>
              Deseja sair?
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#7f8c8d',
              marginBottom: '24px',
            }}>
              Você será redirecionado para a tela de login.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
            }}>
              <button
                onClick={handleLogoutCancel}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: '2px solid #e0e0e0',
                  background: 'white',
                  color: '#7f8c8d',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleLogoutConfirm}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
