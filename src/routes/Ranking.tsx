import { useState, useMemo } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUsers } from "@/hooks/api/useUsers";
import { useNavigate } from "react-router-dom";
import { SkeletonList } from "@/components/Skeleton";

export default function Ranking() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Buscar todos os usuários com limite alto para ranking completo
  const { data: paginatedUsers, isLoading, error } = useUsers(1, 100);

  const images = [
    "exayhaa5rngll7qs8acq.png",
    "cqmpjredic5wuyiow5ob.png",
    "fjbwpp3ooixkmnmxfljm.jpg"
  ];

  // Filtrar e ordenar usuários
  const sortedUsers = useMemo(() => {
    let filtered = [...(paginatedUsers?.data || [])];

    // Aplicar filtro de busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    return filtered.sort((a, b) => b.pontos - a.pontos);
  }, [paginatedUsers?.data, searchTerm]);

  if (isLoading) {
    return (
      <div className="ranking-page">
        <Navbar />
        <div className="ranking-container" style={{ paddingTop: '90px' }}>
          <div className="ranking-header">
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '2.5rem',
              boxShadow: '0 8px 24px rgba(238, 147, 0, 0.4)',
            }}>
              🏆
            </div>
            <h1 className="ranking-title">Ranking de Campeões</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '8px 0 24px' }}>
              Carregando ranking...
            </p>
          </div>
          <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <SkeletonList count={10} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="ranking-page">
        <Navbar />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff6b6b',
          fontSize: '1.2rem'
        }}>
          ⚠️ Erro ao carregar ranking
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ranking-page">
      <Navbar />

      <div className="ranking-content">
        <div className="ranking-header">
          <div className="ranking-progress-card">
            <div className="progress-header">
              <span className="progress-icon">🎯</span>
              <span className="progress-text">Progresso Mensal</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: "66%" }}></div>
            </div>
            <p className="progress-label">10 de 15 desafios concluídos</p>
          </div>
        </div>

        <div className="podium-container">
          <h2 className="podium-title">
            <span>🏆</span> Top 3 Guardiões do Planeta
          </h2>

          <div className="podium">
            {sortedUsers.slice(0, 3).map((user, index) => {
              const position = index === 0 ? 1 : index === 1 ? 2 : 3;
              const heights = { 1: '140px', 2: '110px', 3: '90px' };
              const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };

              return (
                <div
                  key={user.id}
                  className={`podium-item podium-${position}`}
                  style={{ order: position === 1 ? 2 : position === 2 ? 1 : 3, cursor: 'pointer' }}
                  onClick={() => navigate(`/perfil/${user.id}`)}
                >
                  <div className="podium-user">
                    <div className="podium-medal">{medals[position]}</div>
                    <div className="podium-avatar-container">
                      <img
                        className="podium-avatar"
                        alt={user.name}
                        src={`https://res.cloudinary.com/dnulz0tix/image/upload/v1733820561/${images[index] || 'placeholder.jpg'}`}
                      />
                    </div>
                    <h3 className="podium-name">{user.name}</h3>
                    <div className="podium-points">
                      <span className="points-icon">⭐</span>
                      <span className="points-value">{user.pontos}</span>
                    </div>
                  </div>
                  <div className="podium-stand" style={{ height: heights[position] }}>
                    <span className="podium-rank">{position}°</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ranking-list">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 className="ranking-list-title">
              <span>📊</span> Ranking Completo
            </h3>
            {/* Campo de busca */}
            <div style={{ marginTop: '1rem' }}>
              <input
                type="text"
                placeholder="🔍 Buscar usuário por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(238, 147, 0, 0.3)',
                  background: 'rgba(26, 33, 26, 0.8)',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#EE9300';
                  e.target.style.boxShadow = '0 0 0 4px rgba(238, 147, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(238, 147, 0, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchTerm && (
                <p style={{
                  marginTop: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem'
                }}>
                  {sortedUsers.length} resultado{sortedUsers.length !== 1 ? 's' : ''} encontrado{sortedUsers.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          {sortedUsers.slice(3).map((user, index) => (
            <div
              key={user.id}
              className="ranking-list-item"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/perfil/${user.id}`)}
            >
              <div className="ranking-position">{index + 4}°</div>
              <img
                className="ranking-avatar"
                alt={user.name}
                src={`https://res.cloudinary.com/dnulz0tix/image/upload/v1733820561/${images[index + 3] || 'placeholder.jpg'}`}
              />
              <div className="ranking-user-info">
                <p className="ranking-user-name">{user.name}</p>
                <p className="ranking-user-points">
                  <span className="points-icon-small">⭐</span>
                  {user.pontos} pontos
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
