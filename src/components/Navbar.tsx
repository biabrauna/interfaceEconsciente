import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfilePic } from '@/hooks/api';
import { createApiError } from '@/utils/errorHandler';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState("none");
  
  // Use React Query hook to get profile picture
  const { data: userProfilePic } = useUserProfilePic(user?.id || '');
  
  const profileUrl = userProfilePic?.url || 'https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png';
  const displayName = userProfilePic?.name || user?.name || 'Usuário';

  const toggleMenu = () => {
    setIsMenuOpen((prev) => (prev === "flex" ? "none" : "flex"));
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      createApiError(error, 'Logout from navbar');
    }
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
          <p>Vamos reciclar?!</p>
        </div>

        <div className="menu-list" style={{ display: isMenuOpen }}>
          <Link to="/Home"><li>Home</li></Link>
          <div className="bar" />
          <Link to="/Separacao"><li>Como Separar Resíduos</li></Link>
          <div className="bar" />
          <Link to="/Sobre"><li>Sobre o App</li></Link>
          <div className="bar" />
          <Link to="/Duvidas"><li>Dúvidas</li></Link>
          <div className="bar" />
          <button onClick={handleLogout} style={{all: 'unset', cursor: 'pointer'}}><li>Sair</li></button>
          <div className="bar" />
        </div>
      </div>
    </div>
  );
}
