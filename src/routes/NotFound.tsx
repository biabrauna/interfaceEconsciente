import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
        padding: '20px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        {/* Ícone animado */}
        <div
          style={{
            fontSize: '8rem',
            marginBottom: '2rem',
            animation: 'bounce 2s ease-in-out infinite',
          }}
        >
          🌱
        </div>

        {/* Código 404 */}
        <h1
          style={{
            fontSize: '6rem',
            fontWeight: '800',
            color: '#EE9300',
            margin: '0 0 1rem 0',
            lineHeight: '1',
            textShadow: '0 4px 20px rgba(238, 147, 0, 0.4)',
          }}
        >
          404
        </h1>

        {/* Mensagem principal */}
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 1rem 0',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          Ops! Página não encontrada
        </h2>

        {/* Descrição */}
        <p
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 0 3rem 0',
            lineHeight: '1.6',
          }}
        >
          Parece que você se perdeu na floresta digital. 🌳
          <br />
          Esta página não existe ou foi movida.
        </p>

        {/* Botões de ação */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/Home')}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(238, 147, 0, 0.3)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 147, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(238, 147, 0, 0.3)';
            }}
          >
            🏠 Ir para Home
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ← Voltar
          </button>
        </div>

        {/* Links úteis */}
        <div style={{ marginTop: '3rem' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1rem' }}>
            Ou navegue para:
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/Ranking"
              style={{
                color: '#00A335',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#00d444')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#00A335')}
            >
              🏆 Ranking
            </a>
            <a
              href="/Posts"
              style={{
                color: '#00A335',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#00d444')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#00A335')}
            >
              📸 Posts
            </a>
            <a
              href="/Perfil"
              style={{
                color: '#00A335',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#00d444')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#00A335')}
            >
              👤 Perfil
            </a>
          </div>
        </div>
      </div>

      {/* Animações CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `
      }} />
    </div>
  );
}
