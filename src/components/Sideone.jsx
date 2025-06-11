import api from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Sideone() {
  const [desafios, setDesafios] = useState([]);
  const [showDivs, setShowDivs] = useState({}); // Objeto para controlar a visibilidade de cada div
  const navigate = useNavigate();
  const { id } = useParams();
  const lugar = ["left","center","right", "right","center"];
  const display = ["none", "none", "block", "none", "none", "none","none","none"];
  const espaco = ["none", "none", "block", "none", "none", "none", "none","block", "none", "none", "none", "none", "block", "none", "none", "none", "none", "block", "none", "none", "none", "none", "block","none","none","none"]
  const [desafiosCaracol, setDesafiosCaracol] = useState([]);

  async function getDesafios() {
    try {
      const DesafiosFromApi = await api.get('/desafios');
      setDesafiosCaracol(DesafiosFromApi.data)
      setDesafios(DesafiosFromApi.data || []);
      // Inicializar o estado showDivs para todos os desafios como false
      setShowDivs(DesafiosFromApi.data?.reduce((acc, desafio) => ({
        // biome-ignore lint/performance/noAccumulatingSpread: 
        ...acc,
        [desafio.id]: false
      }), {}));
          
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (desafioId) => {
    setShowDivs((prevState) => ({
      ...prevState,
      [desafioId]: !prevState[desafioId]
    }));
  };

  const handlePhoto = () => {
    navigate(`/Camera/${id}`);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: 
  useEffect(() => {
    getDesafios();
  }, []);

  return (
    <div style={{
      marginTop: '20%',
      marginBottom: '20%',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '30px 20px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h1 style={{
            fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em'
          }}>
            🚀 Desafios
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            margin: 0,
            fontWeight: '400'
          }}>
            Escolha um desafio para postar e motivar seus amigos!
          </p>
        </div>

        {/* Challenges Grid */}
        <div style={{
          display: 'grid',
          gap: '25px',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {desafios.map((desafio) => {
            const index = desafiosCaracol.indexOf(desafio);
            
            return(
              <div
                key={desafio.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: showDivs[desafio.id] 
                    ? '0 25px 50px rgba(0, 0, 0, 0.15)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: showDivs[desafio.id] ? 'translateY(-5px)' : 'translateY(0)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  textAlign: lugar[index] || 'center',
                  display: display[index] === "none" ? "none" : "block",
                  marginBottom: espaco[index] === "block" ? "30px" : "0"
                }}
              >
                {/* Challenge Header */}
                <div
                  style={{
                    padding: '25px',
                    cursor: 'pointer',
                    background: showDivs[desafio.id] 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    transition: 'all 0.3s ease',
                    borderBottom: showDivs[desafio.id] ? 'none' : '1px solid rgba(226, 232, 240, 0.5)'
                  }}
                  // biome-ignore lint/a11y/useKeyWithClickEvents: 
                  onClick={() => handleClick(desafio.id)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '15px'
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      margin: 0,
                      color: showDivs[desafio.id] ? '#ffffff' : '#1e293b',
                      transition: 'color 0.3s ease',
                      flex: 1
                    }}>
                      Desafio - {index}
                    </h3>
                    
                    {/* Expand/Collapse Icon */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: showDivs[desafio.id] 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'rgba(102, 126, 234, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      transform: showDivs[desafio.id] ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      <span style={{
                        color: showDivs[desafio.id] ? '#ffffff' : '#667eea',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                {/* Challenge Details */}
                {showDivs[desafio.id] && (
                  <div style={{
                    padding: '30px',
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease-out'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      border: '1px solid rgba(226, 232, 240, 0.5)'
                    }}>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: '#475569',
                        margin: '0 0 15px 0',
                        fontWeight: '400'
                      }}>
                        {desafio.desafios}
                      </p>
                      
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        <span>⭐</span>
                        Pontos: {desafio.valor}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handlePhoto()}
                      style={{
                        width: '100%',
                        padding: '15px 30px',
                        background: 'linear-gradient(45deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                      }}
                    >
                      📸 Postar Desafio
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}