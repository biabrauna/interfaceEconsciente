/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './style.css';
import api from "../services/api";

export default function Navbar() {
  const [profilePics, setProfilePics] = useState([]);
  const [url, setUrl] = useState('https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState("none");

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getProfilePics();
  }, [userId]);

  const getUser = async () => {
    try {
      const me = await api.get('/auth/me');
      setUserId(me.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfilePics = async () => {
    try {
      if (!userId) return;
      const { data } = await api.get('/profilePic');
      setProfilePics(data);

      const matchingProfilePic = data.find((profilePic) => profilePic.userId === userId);

      if (matchingProfilePic) {
        setUrl(matchingProfilePic.url);
        setName(matchingProfilePic.name);
      } else {
        const userFromApi = await api.get(`/users/${userId}`);
        setName(userFromApi.data.name); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => (prev === "flex" ? "none" : "flex"));
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
          <Link to="/"><li>Sair</li></Link>
          <div className="bar" />
        </div>
      </div>
    </div>
  );
}
