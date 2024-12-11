
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "./style.css";

export default function Sobre() {
    return (
        <div className="sobre-container">
            <Navbar />
            <main className="sobre-content">
                <h1>Sobre o App</h1>
                <p>
                    Olá, eu fui criado com o intuito de ajudar você a transformar hábitos de descarte e reciclagem em ações práticas de forma criativa! 
                    Aqui, você encontrará informações simples e relevantes. Também te ajudo a esclarecer dúvidas, ensino como separar resíduos e mostro os 
                    benefícios da reciclagem para o meio ambiente e a sociedade.
                </p>
                <p>
                    Aqui, você receberá um desafio cada vez que cumprir uma ação sustentável, e olha, as recompensas são sensacionais!
                </p>
                <h2>Por que você deveria me ter instalado em seu dispositivo?</h2>
                <p>
                    Quero te mostrar o caminho para você fazer parte da mudança! Juntos, podemos diminuir o impacto ambiental e construir um futuro mais sustentável, 
                    e isso faz com que meu ciclo de vida aumente! Eu sou consciente, e você?
                </p>
            </main>
            <Footer />
        </div>
    );
}
