import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchDesafios } from "@/hooks/api";
import EmptyState from "./EmptyState";
import { showToast } from "@/lib/toast";

export default function Sideone() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDivs, setShowDivs] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  // Use React Query hook for desafios
  const { data: desafios, isLoading, error } = useSearchDesafios(searchTerm);

  // Memoize desafios IDs to prevent infinite loop
  const desafiosIds = useMemo(() =>
    desafios.map(d => d.id).join(','),
    [desafios]
  );

  // Initialize showDivs when desafios IDs change
  React.useEffect(() => {
    if (desafios.length > 0) {
      setShowDivs(
        desafios.reduce((acc, desafio) => ({
          ...acc,
          [desafio.id]: false,
        }), {})
      );
    }
  }, [desafiosIds]);

  const handleClick = (desafioId: string) => {
    setShowDivs((prev) => ({
      ...prev,
      [desafioId]: !prev[desafioId],
    }));
  };

  const handlePhoto = (desafioId: string) => {
    navigate(`/Camera/${desafioId}`);
  };

  // Show toast on error
  React.useEffect(() => {
    if (error) {
      showToast.error('Erro ao carregar desafios. Tente novamente.');
    }
  }, [error]);

  // No need for local filtering - useSearchDesafios handles this
  const filteredDesafios = desafios;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
      paddingTop: '90px',
      paddingBottom: '90px',
      padding: '90px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
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
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            🚀
          </div>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 12px 0',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            Desafios Ecológicos
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#EE9300',
            margin: '0 0 24px 0'
          }}>
            Escolha um desafio e faça a diferença!
          </p>
          {/* Campo de busca */}
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: '500px',
              margin: '0 auto',
              position: 'relative',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Buscar desafios..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: '2px solid rgba(238, 147, 0, 0.3)',
                background: 'rgba(26, 33, 26, 0.95)',
                color: 'white',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#EE9300';
                e.target.style.boxShadow = '0 4px 16px rgba(238, 147, 0, 0.4)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(238, 147, 0, 0.3)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
              }}
            />
            <button
              type="submit"
              style={{
                padding: '16px 24px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(238, 147, 0, 0.3)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(238, 147, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(238, 147, 0, 0.3)';
              }}
            >
              🔍 Buscar
            </button>
          </form>
          {isLoading && (
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '16px', fontSize: '0.95rem' }}>
              ⏳ Carregando desafios...
            </p>
          )}
          {error && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '10px',
              color: '#ff6b6b',
              fontSize: '0.9rem',
              maxWidth: '500px',
              margin: '16px auto 0'
            }}>
              ⚠️ Erro ao carregar desafios
            </div>
          )}
        </div>

        {/* Challenges Grid */}
        {!isLoading && !error && filteredDesafios.length === 0 ? (
          <EmptyState
            icon="🎯"
            title="Nenhum desafio encontrado"
            description={searchTerm ? `Nenhum desafio corresponde a "${searchTerm}". Tente outro termo de busca.` : "Não há desafios disponíveis no momento."}
            actionLabel={searchTerm ? "Limpar busca" : undefined}
            onAction={searchTerm ? () => { setSearchTerm(''); setInputValue(''); } : undefined}
          />
        ) : (
          <div style={{
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          }}>
            {filteredDesafios.map((desafio, index) => (
            <div key={desafio.id} style={{
              background: 'rgba(26, 33, 26, 0.95)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: showDivs[desafio.id]
                ? '2px solid #00A335'
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: showDivs[desafio.id]
                ? '0 8px 30px rgba(0, 163, 53, 0.3)'
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
            }}>
              {/* Header clicável */}
              <div
                onClick={() => handleClick(desafio.id)}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  background: showDivs[desafio.id]
                    ? 'linear-gradient(135deg, #00A335 0%, #00d444 100%)'
                    : 'rgba(50, 52, 65, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (!showDivs[desafio.id]) {
                    e.currentTarget.style.background = 'rgba(50, 52, 65, 0.8)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!showDivs[desafio.id]) {
                    e.currentTarget.style.background = 'rgba(50, 52, 65, 0.6)';
                  }
                }}
              >
                <h3 style={{
                  margin: 0,
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  🎯 Desafio #{index + 1}
                </h3>
                <span style={{
                  fontSize: '1.5rem',
                  transform: showDivs[desafio.id] ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </div>

              {/* Detalhes */}
              {showDivs[desafio.id] && (
                <div style={{
                  padding: '24px',
                  background: 'rgba(50, 52, 65, 0.4)',
                  animation: 'slideDown 0.3s ease-out'
                }}>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    margin: '0 0 16px 0'
                  }}>
                    {desafio.desafios}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: 'rgba(238, 147, 0, 0.15)',
                    borderRadius: '10px',
                    border: '1px solid rgba(238, 147, 0, 0.3)',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
                    <span style={{
                      color: '#EE9300',
                      fontWeight: '600',
                      fontSize: '1.1rem'
                    }}>
                      {desafio.valor} pontos
                    </span>
                  </div>
                  <button
                    onClick={() => handlePhoto(desafio.id)}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      border: 'none',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #00A335 0%, #00d444 100%)',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0, 163, 53, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 163, 53, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 163, 53, 0.3)';
                    }}
                  >
                    📸 Postar Desafio
                  </button>
                </div>
              )}
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
