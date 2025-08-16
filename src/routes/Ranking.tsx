import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User } from "@/types";

export default function Ranking() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const handleUsers = async () => {
      try {
        const { data } = await api.get('/usuarios');
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    handleUsers();
  }, []); // Adicionado array vazio para rodar apenas uma vez

  const images = [
    "exayhaa5rngll7qs8acq.png",
    "cqmpjredic5wuyiow5ob.png",
    "fjbwpp3ooixkmnmxfljm.jpg"
  ];

  const sortedUsers = [...users].sort((a, b) => b.pontos - a.pontos);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "80%" }}>
      <Navbar />

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20vh",
        marginLeft: "30px",
        marginRight: "40px",
        marginBottom: "50%"
      }}>
        <img
          alt="imagem"
          style={{ width: "160px" }}
          src="https://res.cloudinary.com/dnulz0tix/image/upload/v1733821330/khkunz0zbgkhuhqugvqc.png"
        />
        <p>10 desafios de 15 no mês de novembro</p>

        <div className="ranking" style={{
          padding: "0px",
          width: "100%",
          height: "80vh",
          marginLeft: "30px"
        }}>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>Classificações</p>

          {sortedUsers.slice(0, 3).map((user, index) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginRight: "20px"
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  width: "70px",
                  height: "70px"
                }}
                alt="imagem"
                src={`https://res.cloudinary.com/dnulz0tix/image/upload/v1733820561/${images[index] || 'placeholder.jpg'}`}
              />
              <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: "20px",
                marginRight: "60px"
              }}>
                <p style={{ fontSize: "14px" }}>Nome: {user.name}</p>
                <p style={{ fontSize: "14px" }}>Pontos: {user.pontos}</p>
              </div>
              <p>{index + 1}°</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
