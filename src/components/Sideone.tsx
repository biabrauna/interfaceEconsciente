import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchDesafios } from "@/hooks/api";

export default function Sideone() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDivs, setShowDivs] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Use React Query hook for desafios
  const { data: desafios = [], isLoading, error } = useSearchDesafios(searchTerm);
  
  // Initialize showDivs when desafios data changes
  React.useEffect(() => {
    if (desafios.length > 0) {
      setShowDivs(
        desafios.reduce((acc, desafio) => ({
          ...acc,
          [desafio.id]: false,
        }), {})
      );
    }
  }, [desafios]);

  const handleClick = (desafioId: string) => {
    setShowDivs((prev) => ({
      ...prev,
      [desafioId]: !prev[desafioId],
    }));
  };

  const handlePhoto = () => {
    navigate(`/Camera/${id}`);
  };

  // No need for local filtering - useSearchDesafios handles this
  const filteredDesafios = desafios;

  return (
    <div style={{
      marginTop: '20%',
      marginBottom: '20%',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          <h1 style={{
            fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em',
          }}>
            🚀 Desafios
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
          }}>
            Escolha um desafio para postar e motivar seus amigos!
          </p>
          {/* Campo de busca */}
          <input
            type="text"
            placeholder="Buscar desafios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              width: '80%',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          {isLoading && (
            <p style={{ color: '#666', marginTop: '10px' }}>Carregando desafios...</p>
          )}
          {error && (
            <p style={{ color: '#e74c3c', marginTop: '10px' }}>Erro ao carregar desafios</p>
          )}
        </div>

        {/* Challenges Grid */}
        <div style={{
          display: 'grid',
          gap: '25px',
          gridTemplateColumns:
            window.innerWidth <= 768
              ? '1fr'
              : 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>
          {filteredDesafios.map((desafio, index) => (
            <div key={desafio.id} style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: showDivs[desafio.id]
                ? '0 25px 50px rgba(0, 0, 0, 0.15)'
                : '0 10px 30px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s',
            }}>
              {/* Header clicável */}
              <div
                onClick={() => handleClick(desafio.id)}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  background: showDivs[desafio.id]
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                }}
              >
                <h3 style={{
                  margin: 0,
                  color: showDivs[desafio.id] ? '#fff' : '#1e293b',
                }}>
                  Desafio - {index + 1}
                </h3>
              </div>

              {/* Detalhes */}
              {showDivs[desafio.id] && (
                <div style={{ padding: '20px', color: '#000' }}>
                  <p>{desafio.desafios}</p>
                  <div style={{ margin: '10px 0' }}>
                    <strong>Pontos:</strong> {desafio.valor}
                  </div>
                  <button onClick={handlePhoto} style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #10b981, #059669)',
                    color: '#fff',
                    cursor: 'pointer',
                  }}>
                    📸 Postar Desafio
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
