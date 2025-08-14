import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import './style.css';
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState('https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png');
  const [name, setName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState("none");

  const getProfilePics = useCallback(async () => {
    try {
      if (!user?.id) return;
      const { data } = await api.get('/profilePic');

      const matchingProfilePic = data.find((profilePic) => profilePic.userId === user.id);

      if (matchingProfilePic) {
        setUrl(matchingProfilePic.url);
        setName(matchingProfilePic.name);
      } else {
        setName(user.name || 'Usuário'); 
      }
    } catch (error) {
      console.error('Error fetching profile pics:', error);
      // Fallback to user name from context
      setName(user.name || 'Usuário');
    }
  }, [user]);

  // Executar getProfilePics quando user mudar
  useEffect(() => {
    if (user) {
      getProfilePics();
    }
  }, [getProfilePics, user]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => (prev === "flex" ? "none" : "flex"));
  };

  const handleLogout = async () => {
    try {
      await logout();
      // navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
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
            <img className="profilePic" src={url} alt="Foto de perfil" />
          </div>
        </Link>

        <div className="profile-name">
          <p>Olá {name},</p>
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
