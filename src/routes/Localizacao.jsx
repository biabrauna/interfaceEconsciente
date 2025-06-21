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
import { MapPin } from "lucide-react";
import "./MapPage.css";

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
      address:
        "Av. Brasil nº 13.550, em frente ao viaduto de Parada de Lucas, pista de subida",
    },
    {
      title: "Ilha do Governador",
      address:
        "Comunidade do Dendê (Av. Paranapuan), Vila Joaniza (Estrada das Canárias), Parque Royal (Av. Gov. Chagas Freitas)",
    },
    { title: "Botafogo", address: "Rua General Polidoro, nº 65" },
    {
      title: "Penha",
      address: "Rua Merindiba, s/nº - Próximo à Igreja da Penha",
    },
    { title: "Tijuca", address: "Rua Dr. Renato Rocco, 400" },
    { title: "Bangu", address: "Rua Roque Barbosa, 348 - Vila Catiri" },
    { title: "Campo Grande", address: "Estrada do Magarça, 1" },
    {
      title: "Marechal Hermes",
      address: "Rua Comandante Magalhães de Almeida, 217",
    },
  ];

  return (
    <div>
      <Navbar />
      <div
        style={{
          marginTop: "10%",
          marginBottom: "5%",
          padding: "0rem 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Encontre um ponto de coleta
        </h2>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 0.3fr))",
            margin: "0 auto",
          }}
        >
          {pontos.map((point) => (
            <div
              key={point.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: "1rem",
                padding: "0.2rem 0.8rem",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin
                  style={{ color: " #764ba2", width: "1.25rem", height: "1.25rem", marginRight: "0.5rem" }}
                />
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: ' #764ba2',
                  }}
                >
                  {point.title}
                </h3>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#000" }}>
                {point.address}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="map">
      <LoadScript
        googleMapsApiKey='AIzaSyB_cTTz6LzErqpPHKxkiFpXZncefRBZfBQ'
        libraries={["places"]}
      >
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "50%" }} // Ajuste o tamanho conforme necessário
          center={position}
          zoom={15} // Ajuste o nível de zoom
        >
          <div className="address">
            <StandaloneSearchBox
              onLoad={onLoadA}
              onPlacesChanged={() => onPlacesChanged(searchBoxA, setPointA)}
            >
              <input
                className="addressField"
                placeholder="Digite o endereço inicial"
              />
            </StandaloneSearchBox>
            <StandaloneSearchBox
              onLoad={onLoadB}
              onPlacesChanged={() => onPlacesChanged(searchBoxB, setPointB)}
            >
              <input
                className="addressField"
                placeholder="Digite o endereço final"
              />
            </StandaloneSearchBox>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button onClick={traceRoute}>Traçar rota</button>
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
      </LoadScript>
    </div>
      <Footer />
    </div>
  );
};

export default MapPage;
