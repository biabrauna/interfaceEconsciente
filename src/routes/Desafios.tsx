import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDesafios } from '@/hooks/api/useDesafios';
import { SkeletonList } from '@/components/Skeleton';

export default function Desafios() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: paginatedDesafios, isLoading, error } = useDesafios(1, 100);

  const filteredDesafios = searchTerm.trim()
    ? paginatedDesafios?.data.filter(desafio =>
        desafio.desafios.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : paginatedDesafios?.data || [];

  const handleStartChallenge = (desafioId: string) => {
    navigate(`/Camera/${desafioId}`);
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
      }}>
        <Navbar />
        <div style={{ padding: '90px 20px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            marginBottom: '2rem',
          }}>
            🎯 Desafios Disponíveis
          </h1>
          <SkeletonList count={6} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
      }}>
        <Navbar />
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff6b6b',
          fontSize: '1.2rem',
        }}>
          ⚠️ Erro ao carregar desafios
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
    }}>
      <Navbar />

      <div style={{ padding: '90px 20px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem',
          }}>
            🎯 Desafios Disponíveis
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
            Complete desafios e ganhe pontos!
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="🔍 Buscar desafio..."
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
              e.currentTarget.style.borderColor = '#EE9300';
              e.currentTarget.style.boxShadow = '0 0 0 4px rgba(238, 147, 0, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(238, 147, 0, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {searchTerm && (
            <p style={{
              marginTop: '0.5rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem',
            }}>
              {filteredDesafios.length} resultado{filteredDesafios.length !== 1 ? 's' : ''} encontrado{filteredDesafios.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {filteredDesafios.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'rgba(255, 255, 255, 0.5)',
          }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
            <p style={{ fontSize: '1.2rem' }}>Nenhum desafio encontrado</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {filteredDesafios.map((desafio) => (
              <div
                key={desafio.id}
                style={{
                  background: 'rgba(26, 33, 26, 0.8)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '2px solid rgba(238, 147, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#EE9300';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(238, 147, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(238, 147, 0, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handleStartChallenge(desafio.id)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 0,
                  }}>
                    {desafio.desafios}
                  </h3>
                  <div style={{
                    background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}>
                    <span>⭐</span>
                    <span>{desafio.valor} pts</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartChallenge(desafio.id);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(238, 147, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  📸 Iniciar Desafio
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
