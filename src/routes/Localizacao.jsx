/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect} from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  StandaloneSearchBox,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import "./MapPage.css"; // Importe seu arquivo de estilo CSS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [searchBoxA, setSearchBoxA] = useState(null);
  const [searchBoxB, setSearchBoxB] = useState(null);
  const [pointA, setPointA] = useState(null);
  const [pointB, setPointB] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [response, setResponse] = useState(null);

  const position = {
    lat: -27.590824, // Substitua pelas coordenadas iniciais desejadas
    lng: -48.551262,
  };

  const onMapLoad = (map) => setMap(map);

  const onLoadA = (ref) => setSearchBoxA(ref);

  const onLoadB = (ref) => setSearchBoxB(ref);
  const [directionsService, setDirectionsService] = useState(null);

useEffect(() => {
  if (map) {
    setDirectionsService(new window.google.maps.DirectionsService(map));
  }
}, [map]);

  const onPlacesChanged = (searchBox, setPoint) => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
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
  
  // ...
  
  <DirectionsService options={directionsServiceOptions} />

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

  return (
    <div>
      <Navbar />
      <div className="texto">
      <p>Encontre o ponto de coleta mais perto de você</p>
  <div className="item">
    <span style={{color: "#ED9300"}}>Parada de Lucas:</span> Av. Brasil nº 13.550, em frente ao viaduto de Parada de Lucas, pista de subida
  </div>
  <div className="item">
    <span style={{color: "#ED9300"}}>Ilha do Governador:</span>
    <ul>
      <li>Comunidade do Dendê (Av. Paranapuan)</li>
      <li>Vila Joaniza (Estrada das Canárias)</li>
      <li>Parque Royal (Av. Governador Chagas Freitas)</li>
    </ul>
  </div>

  <div className="item">
    <span style={{color: "#ED9300"}}>Botafogo:</span> Rua General Polidoro, nº 65, Botafogo
  </div>
  <div className="item">
    <span style={{color: "#ED9300"}}>Penha:</span> Rua Merindiba, s/nº, Penha - próximo a Igreja da Penha
  </div>
  <div className="item">
    <span style={{color: "#ED9300"}}>Tijuca:</span> Rua Dr. Renato Rocco, 400, Tijuca
  </div>
  <div className="item">
    <span style={{color: "#ED9300"}}>Bangu:</span> Rua Roque Barbosa, 348, Vila Catiri, Bangu
  </div>
  <div className="item">
    <span style={{color: "#ED9300"}}>Campo Grande:</span> Estrada do Magarça, 1, Campo Grande
  </div>
  <div className="item">
    <span style={{color: "#ED9300"}}>Marechal Hermes:</span> Rua Comandante Magalhães de Almeida, 217
</div>
  </div>
    <div className="map">
      <LoadScript
        googleMapsApiKey='AIzaSyD_A8ia44H5rEEtiC3tdZZaLB7qdPZPc8g'
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
    <Footer/>
    </div>
  );
};

export default MapPage;
