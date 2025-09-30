/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { useEffect, useState } from "react";
import './style.css'
import { User } from "@/types";
export default function Perfil(){
    const [usersInfo, setUsersInfo] = useState<User[]>([]);
    const [profilePics, setProfilePics] = useState([]);
    const [url, setUrl] = useState('https://res.cloudinary.com/dnulz0tix/image/upload/v1733802865/i6kojbxaeh39jcjqo3yh.png');
    const [name, setName] = useState('');
    const [biografia, setBiografia] = useState('');
    const [seguidores, setSeguidores] = useState('');
    const [seguindo, setSeguindo] = useState('');
    const [pontos, setPontos] = useState('');
    const [userId, setUserId] = useState(null);

    const getUser = async () => {
        try {
          const me = await api.get('/auth/me');
          setUserId(me.data.id);
          const usersInfoFromApi = await api.get(`/users/${me.data.id}`)
          setUsersInfo(usersInfoFromApi.data);
        } catch (error) {
          console.error(error);
        }
      }

      const getProfilePics = async () => {
        try {
          if (!userId) return;
          const profilePicFromApi = await api.get('/profilePic');
          setProfilePics(profilePicFromApi.data);
          const matchingProfilePic = profilePicFromApi.data.find(profilePic => profilePic.userId === userId)
    
          if (matchingProfilePic) {
            setUrl(matchingProfilePic.url);
            setName(matchingProfilePic.name);
            return
          }
          // biome-ignore lint/style/noUselessElse: <explanation>
          else{
            const userFromApi = await api.get(`/users/${userId}`);
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
    
      useEffect(() => {
        getUser();
      }, []);

      useEffect(() => {
        getProfilePics();
      }, [userId]);

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
                    <div className="achievements-grid">
                        <div className="achievement-badge">
                            <div className="achievement-icon">🌱</div>
                            <div className="achievement-name">Iniciante</div>
                        </div>
                        <div className="achievement-badge">
                            <div className="achievement-icon">♻️</div>
                            <div className="achievement-name">Reciclador</div>
                        </div>
                        <div className="achievement-badge locked">
                            <div className="achievement-icon">🌍</div>
                            <div className="achievement-name">Guardião</div>
                        </div>
                        <div className="achievement-badge locked">
                            <div className="achievement-icon">🌟</div>
                            <div className="achievement-name">Lenda</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
