/* eslint-disable no-unused-vars */
import Footer from "../components/Footer";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style.css'
export default function Perfil(){
    const [usersInfo, setUsersInfo] = useState([]);
    const { id } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState("none");
    const [profilePics, setProfilePics] = useState([]);
    const [url, setUrl] = useState('https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png');
    const [name, setName] = useState('');
    const [biografia, setBiografia] = useState('');
    const [seguidores, setSeguidores] = useState('');
    const [seguindo, setSeguindo] = useState('');
    const [pontos, setPontos] = useState('');

    const getUser = async () => {
        try {
          const usersInfoFromApi = await api.get(`https://api-register-users-rrgg-one.vercel.app/users/${id}`)
          setUsersInfo(usersInfoFromApi.data);
          
        } catch (error) {
          console.error(error);
        }
      }

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
          else{
            const userFromApi = await api.get(`https://api-register-users-rrgg-one.vercel.app/users/${id}`);
            setName(userFromApi.data.name);
            setBiografia(userFromApi.data.biografia);
            setSeguidores(userFromApi.data.seguidores);
            setSeguindo(userFromApi.data.seguindo);
            setPontos(userFromApi.data.pontos);
          }
        } catch (error) {
          console.error(error);
        }
      }
    
    const toggleMenu = () => {
        if (isMenuOpen==="flex"){
            setIsMenuOpen("none");
        }
        else{
            setIsMenuOpen("flex");
        }
    };

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        getUser();
        getProfilePics();
      }, []);

    return(
        <div>
            <div className="nav">
                <div className="nav-responsive">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<div className="menu-hamburguer" onClick={toggleMenu}>
                <div className="bar1" />
                <div className="bar2" />
                <div className="bar3" />
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
          <Link  to="/Login"><li>Sair</li></Link>
          <div className="bar" />
        </div>
        </div>
            
            </div>
                <div className="profile-container-perfil">
                    <div className="image-container-perfil">
                    <Link to={`/Perfil/${id}`}>
                    <img className="profilePic-perfil" src={url} alt="logo"/>    
                    </Link> 
                    </div>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "5px"}}>

                    {/* biome-ignore lint/a11y/useAltText: <explanation> */}
<p>{name} </p><img style={{width: "25px", height: "25px"}} src="https://res.cloudinary.com/dnulz0tix/image/upload/v1733802264/lydf03q1ootluvobgb7c.png"/>
                    </div>
                    <div className="profile-info">
                        <p>{usersInfo.seguidores} seguidores</p>
                        <p>{usersInfo.seguindo} seguindo</p>
                        <div className="biografia">
                        <p>{usersInfo.biografia}</p>
                        </div>
                        <p>{usersInfo.pontos} pontos acumulados</p>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}
