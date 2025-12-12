import { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";

const MapPage = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Centro do mapa (Florianópolis)
  const defaultCenter = {
    lat: -27.590824,
    lng: -48.551262,
  };

  // Pontos de coleta com coordenadas reais
  const pontos = [
    {
      id: 1,
      title: "Centro de Reciclagem Norte",
      address: "Av. Brasil nº 13.550, em frente ao viaduto de Parada de Lucas",
      emoji: "♻️",
      lat: -27.550824,
      lng: -48.501262,
    },
    {
      id: 2,
      title: "Ecoponto Ilha",
      address: "Av. Paranapuan - Comunidade do Dendê",
      emoji: "🏝️",
      lat: -27.520824,
      lng: -48.521262,
    },
    {
      id: 3,
      title: "Coleta Seletiva Botafogo",
      address: "Rua General Polidoro, nº 65",
      emoji: "🌊",
      lat: -27.590824,
      lng: -48.551262,
    },
    {
      id: 4,
      title: "Centro Ambiental Penha",
      address: "Rua Merindiba, s/nº - Próximo à Igreja",
      emoji: "⛪",
      lat: -27.610824,
      lng: -48.571262,
    },
    {
      id: 5,
      title: "Ecoponto Tijuca",
      address: "Rua Dr. Renato Rocco, 400",
      emoji: "🌳",
      lat: -27.630824,
      lng: -48.591262,
    },
    {
      id: 6,
      title: "Reciclagem Bangu",
      address: "Rua Roque Barbosa, 348 - Vila Catiri",
      emoji: "🏘️",
      lat: -27.570824,
      lng: -48.531262,
    },
    {
      id: 7,
      title: "Coleta Campo Grande",
      address: "Estrada do Magarça, 1",
      emoji: "🌾",
      lat: -27.600824,
      lng: -48.481262,
    },
    {
      id: 8,
      title: "Centro Sustentável Hermes",
      address: "Rua Cmte. Magalhães de Almeida, 217",
      emoji: "🏛️",
      lat: -27.560824,
      lng: -48.561262,
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
      paddingBottom: '80px'
    }}>
      <Navbar />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 16px 20px'
      }}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #00A335 0%, #00d444 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '2.5rem',
            boxShadow: '0 8px 24px rgba(0, 163, 53, 0.4)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            📍
          </div>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 12px 0',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            Pontos de Coleta
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#EE9300',
            margin: '0'
          }}>
            Encontre o local mais próximo para descarte consciente
          </p>
        </div>

        {/* Points Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {pontos.map((point) => (
            <div
              key={point.id}
              onClick={() => setSelectedPoint(point)}
              style={{
                background: selectedPoint?.id === point.id
                  ? 'rgba(0, 163, 53, 0.2)'
                  : 'rgba(26, 33, 26, 0.95)',
                borderRadius: '16px',
                padding: '20px',
                border: selectedPoint?.id === point.id
                  ? '2px solid #00A335'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                if (selectedPoint?.id !== point.id) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(0, 163, 53, 0.5)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 163, 53, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (selectedPoint?.id !== point.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: '0 4px 12px rgba(238, 147, 0, 0.4)'
                }}>
                  {point.emoji}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  margin: '0',
                  flex: 1
                }}>
                  {point.title}
                </h3>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <MapPin
                  size={18}
                  style={{
                    color: '#00A335',
                    marginTop: '2px',
                    flexShrink: 0
                  }}
                />
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: '0',
                  lineHeight: '1.5'
                }}>
                  {point.address}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div style={{
          background: 'rgba(26, 33, 26, 0.95)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            marginBottom: '20px'
          }}>
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: '600',
              color: '#EE9300',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <MapPin size={24} />
              Mapa de Localização
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.95rem',
              margin: '0'
            }}>
              {selectedPoint
                ? `📍 ${selectedPoint.title} - Clique no mapa para traçar rotas`
                : 'Clique em um ponto de coleta acima para visualizá-lo no mapa'}
            </p>
          </div>

          <LoadScript googleMapsApiKey='AIzaSyB_cTTz6LzErqpPHKxkiFpXZncefRBZfBQ'>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: window.innerWidth < 768 ? "400px" : "500px",
                }}
                center={selectedPoint || defaultCenter}
                zoom={selectedPoint ? 15 : 12}
                options={{
                  styles: [
                    {
                      featureType: "all",
                      elementType: "geometry",
                      stylers: [{ color: "#242f3e" }]
                    },
                    {
                      featureType: "all",
                      elementType: "labels.text.stroke",
                      stylers: [{ color: "#242f3e" }]
                    },
                    {
                      featureType: "all",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#746855" }]
                    },
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#17263c" }]
                    }
                  ],
                  zoomControl: true,
                  mapTypeControl: true,
                  scaleControl: true,
                  streetViewControl: true,
                  rotateControl: true,
                  fullscreenControl: true
                }}
              >
                {/* Marcadores para todos os pontos */}
                {pontos.map((point) => (
                  <Marker
                    key={point.id}
                    position={{ lat: point.lat, lng: point.lng }}
                    onClick={() => setSelectedPoint(point)}
                    title={point.title}
                    icon={{
                      url: selectedPoint?.id === point.id
                        ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    }}
                    animation={selectedPoint?.id === point.id ? window.google.maps.Animation.BOUNCE : null}
                  />
                ))}
              </GoogleMap>
            </div>
          </LoadScript>

          {/* Dica de uso */}
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(0, 163, 53, 0.1)',
            border: '1px solid rgba(0, 163, 53, 0.3)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ fontSize: '1.5rem' }}>💡</div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.9rem',
              margin: '0',
              lineHeight: '1.5'
            }}>
              <strong>Dica:</strong> Use os controles do Google Maps para visualizar rotas, Street View e mais opções de navegação!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;

// Adicionar estilos responsivos inline
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .map-container {
      padding: 60px 12px 12px !important;
    }
  }
`;
document.head.appendChild(style);
