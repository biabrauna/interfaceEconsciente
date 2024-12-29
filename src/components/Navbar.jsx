/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './style.css'
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function Navbar() {

  const [profilePics, setProfilePics] = useState([]);
  const [url, setUrl] = useState('https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png');
  const [name, setName] = useState('');
  const { id } = useParams();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getProfilePics();
  }, [profilePics]);
  const getProfilePics = async () => {
    try {
      const profilePicFromApi = await api.get('https://api-register-users-rrgg-one.vercel.app/profilePic');
      setProfilePics(profilePicFromApi.data);
      const matchingProfilePic = profilePics.find(profilePic => profilePic.userId === id)

      if (matchingProfilePic) {
        setUrl(matchingProfilePic.url);
        setName(matchingProfilePic.name);
        return
      }
      // biome-ignore lint/style/noUselessElse: <explanation>
      else  {
        const userFromApi = await api.get(`https://api-register-users-rrgg-one.vercel.app/users/${id}`);
        setName(userFromApi.data.name); 
      }
    } catch (error) {
      console.error(error);
    }
  }

  


    const [isMenuOpen, setIsMenuOpen] = useState("none");

    const toggleMenu = () => {
        if (isMenuOpen==="flex"){
            setIsMenuOpen("none");
        }
        else{
            setIsMenuOpen("flex");
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
      <Link to={`/Perfil/${id}`}><div className="profile">
       
            <img className="profilePic" src={url} alt="logo"/>
        </div> </Link>
        <div className="profile-name">
        <p>Olá {name},</p>
           <p>Vamos reciclar?!</p>
          </div>
      
        
        <div className="menu-list" style={{ display: isMenuOpen }}>
          <Link  to={`/Home/${id}`}><li>Home</li></Link>
          <div className="bar" />
          <Link  to={`/Separacao/${id}`}><li>Como Separar Residuos</li></Link>
          <div className="bar" />
          <Link  to={`/Sobre/${id}`}><li>Sobre o App</li></Link>
          <div className="bar" />
          <Link  to={`/Duvidas/${id}`}><li>Duvidas</li></Link>
          <div className="bar" />
          <Link  to="/"><li>Sair</li></Link>
          <div className="bar" />
       
        </div>
</div></div>
    );
  }