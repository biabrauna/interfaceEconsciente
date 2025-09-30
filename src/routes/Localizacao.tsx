/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Navigation, Search } from "lucide-react";

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [searchBoxA, setSearchBoxA] = useState(null);
  const [searchBoxB, setSearchBoxB] = useState(null);
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [response, setResponse] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

  const position = {
    lat: -27.590824,
    lng: -48.551262,
  };

  const onMapLoad = (map) => setMap(map);
  const onLoadA = (ref) => setSearchBoxA(ref);
  const onLoadB = (ref) => setSearchBoxB(ref);

  useEffect(() => {
    if (map) {
      setDirectionsService(new window.google.maps.DirectionsService(map));
    }
  }, [map]);

  const onPlacesChanged = (searchBox, setPoint) => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places[0]?.geometry?.location) {
        const location = {
          lat: places[0].geometry.location.lat(),
          lng: places[0].geometry.location.lng(),
        };
        setPoint(location);
        map?.panTo(location);
      }
    }
  };

  const traceRoute = () => {
    if (pointA && pointB && directionsService) {
      directionsService.route(
        {
          origin: pointA,
          destination: pointB,
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK") {
            setResponse(response);
          } else {
            console.error("Directions request failed:", status, response);
          }
        }
      );
    }
  };

  const directionsServiceOptions = useMemo(
    () =>
      origin && destination
        ? {
            origin,
            destination,
            travelMode: "DRIVING",
          }
        : null,
    [origin, destination]
  );

  const directionsCallback = (res) => {
    if (res?.status === "OK") {
      setResponse(res);
    } else {
      console.error("Directions request failed:", res?.status, res);
    }
  };

  const directionsRendererOptions = useMemo(
    () => (response ? { directions: response } : undefined),
    [response]
  );

  const pontos = [
    {
      title: "Parada de Lucas",
      address: "Av. Brasil nº 13.550, em frente ao viaduto de Parada de Lucas",
      emoji: "📍"
    },
    {
      title: "Ilha do Governador",
      address: "Av. Paranapuan - Comunidade do Dendê",
      emoji: "🏝️"
    },
    { title: "Botafogo", address: "Rua General Polidoro, nº 65", emoji: "🌊" },
    {
      title: "Penha",
      address: "Rua Merindiba, s/nº - Próximo à Igreja",
      emoji: "⛪"
    },
    { title: "Tijuca", address: "Rua Dr. Renato Rocco, 400", emoji: "🌳" },
    { title: "Bangu", address: "Rua Roque Barbosa, 348 - Vila Catiri", emoji: "🏘️" },
    { title: "Campo Grande", address: "Estrada do Magarça, 1", emoji: "🌾" },
    {
      title: "Marechal Hermes",
      address: "Rua Cmte. Magalhães de Almeida, 217",
      emoji: "🏛️"
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
        padding: '80px 20px 20px'
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
          {pontos.map((point, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(26, 33, 26, 0.95)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(0, 163, 53, 0.5)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 163, 53, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
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
              <Navigation size={24} />
              Traçar Rota
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.95rem',
              margin: '0'
            }}>
              Digite os endereços de origem e destino para encontrar o melhor caminho
            </p>
          </div>

          <LoadScript
            googleMapsApiKey='AIzaSyB_cTTz6LzErqpPHKxkiFpXZncefRBZfBQ'
            libraries={["places"]}
          >
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              <GoogleMap
                onLoad={onMapLoad}
                mapContainerStyle={{
                  width: "100%",
                  height: "500px",
                  borderRadius: '16px'
                }}
                center={position}
                zoom={13}
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
                    }
                  ]
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '90%',
                  maxWidth: '400px',
                  zIndex: 10
                }}>
                  <StandaloneSearchBox
                    onLoad={onLoadA}
                    onPlacesChanged={() => onPlacesChanged(searchBoxA, setPointA)}
                  >
                    <div style={{
                      position: 'relative'
                    }}>
                      <Search
                        size={18}
                        style={{
                          position: 'absolute',
                          left: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#00A335',
                          zIndex: 1
                        }}
                      />
                      <input
                        style={{
                          width: '100%',
                          padding: '14px 14px 14px 44px',
                          borderRadius: '12px',
                          border: '2px solid rgba(0, 163, 53, 0.3)',
                          background: 'rgba(26, 33, 26, 0.98)',
                          color: 'white',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        placeholder="Endereço de origem"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#00A335';
                          e.target.style.boxShadow = '0 4px 16px rgba(0, 163, 53, 0.4)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(0, 163, 53, 0.3)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                        }}
                      />
                    </div>
                  </StandaloneSearchBox>

                  <StandaloneSearchBox
                    onLoad={onLoadB}
                    onPlacesChanged={() => onPlacesChanged(searchBoxB, setPointB)}
                  >
                    <div style={{
                      position: 'relative'
                    }}>
                      <MapPin
                        size={18}
                        style={{
                          position: 'absolute',
                          left: '14px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#EE9300',
                          zIndex: 1
                        }}
                      />
                      <input
                        style={{
                          width: '100%',
                          padding: '14px 14px 14px 44px',
                          borderRadius: '12px',
                          border: '2px solid rgba(238, 147, 0, 0.3)',
                          background: 'rgba(26, 33, 26, 0.98)',
                          color: 'white',
                          fontSize: '0.95rem',
                          outline: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        placeholder="Endereço de destino"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#EE9300';
                          e.target.style.boxShadow = '0 4px 16px rgba(238, 147, 0, 0.4)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(238, 147, 0, 0.3)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                        }}
                      />
                    </div>
                  </StandaloneSearchBox>

                  <button
                    onClick={traceRoute}
                    disabled={!pointA || !pointB}
                    style={{
                      padding: '14px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: pointA && pointB
                        ? 'linear-gradient(135deg, #EE9300 0%, #ff9e00 100%)'
                        : 'rgba(50, 52, 65, 0.8)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: pointA && pointB ? 'pointer' : 'not-allowed',
                      opacity: pointA && pointB ? 1 : 0.5,
                      boxShadow: pointA && pointB
                        ? '0 4px 15px rgba(238, 147, 0, 0.3)'
                        : '0 4px 12px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => {
                      if (pointA && pointB) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(238, 147, 0, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (pointA && pointB) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(238, 147, 0, 0.3)';
                      }
                    }}
                  >
                    <Navigation size={20} />
                    Traçar Rota
                  </button>
                </div>

                {pointA && !response && <Marker position={pointA} />}
                {pointB && !response && <Marker position={pointB} />}

                {directionsServiceOptions && (
                  <DirectionsService
                    options={directionsServiceOptions}
                    callback={directionsCallback}
                  />
                )}

                {directionsRendererOptions && (
                  <DirectionsRenderer options={directionsRendererOptions} />
                )}
              </GoogleMap>
            </div>
          </LoadScript>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
