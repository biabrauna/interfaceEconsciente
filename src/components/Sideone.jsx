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
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getDesafios();
  }, []);

  return (
    <div className="caminho">
      <p>Escolha um desafio para postar e motivar seu amigos!</p>
      {desafios.map((desafio) => {
        const index = desafiosCaracol.indexOf(desafio);
          return(
          <div style={{ display: "flex", alignItems: "center", justifyContent: lugar[index%5] }} key={desafio.id}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <img
              className="mascote"
              alt="mascote"
              style={{ display: display[index%5], alignItems: "center", justifyContent: "left", marginRight: "40vw", width: "10rem", height: "8rem" }}
              src="https://res.cloudinary.com/dnulz0tix/image/upload/v1733788670/ugdu5zerglmwnykudpd2"
            />
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
<img
              className="sacola"
              alt="sacola"
              src="https://res.cloudinary.com/dnulz0tix/image/upload/v1733785070/dxc4om6ttrsrgkfe0mgc.png"
              onClick={() => handleClick(desafio.id)}
            /> 
            <div style={{ display: espaco[index], height: "40px", width: "40px" }}/>
            
            {showDivs[desafio.id] && (
              <div className="desafio-container">
                <p>{desafio.desafios}</p>
                <p>Pontos: {desafio.valor}</p>
                <button className="btn" type="submit" onClick={() => handlePhoto()}>Postar</button>
              </div>
      )}
          </div>
      )
      })}
       
      
    </div>
  );
}