import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUsers } from "@/hooks/api/useUsers";

export default function Ranking() {
  // Buscar todos os usuários com limite alto para ranking completo
  const { data: paginatedUsers, isLoading, error } = useUsers(1, 100);

  const images = [
    "exayhaa5rngll7qs8acq.png",
    "cqmpjredic5wuyiow5ob.png",
    "fjbwpp3ooixkmnmxfljm.jpg"
  ];

  // Ordenar usuários por pontos (maior para menor)
  const sortedUsers = [...(paginatedUsers?.data || [])].sort((a, b) => b.pontos - a.pontos);

  if (isLoading) {
    return (
      <div className="ranking-page">
        <Navbar />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          ⏳ Carregando ranking...
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
          <img
            alt="Troféu"
            className="ranking-trophy"
            src="https://res.cloudinary.com/dnulz0tix/image/upload/v1733821330/khkunz0zbgkhuhqugvqc.png"
          />
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
                  style={{ order: position === 1 ? 2 : position === 2 ? 1 : 3 }}
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
          <h3 className="ranking-list-title">
            <span>📊</span> Ranking Completo
          </h3>
          {sortedUsers.slice(3).map((user, index) => (
            <div key={user.id} className="ranking-list-item">
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
