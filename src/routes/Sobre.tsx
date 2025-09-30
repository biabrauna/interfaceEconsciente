
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "./style.css";

export default function Sobre() {
    return (
        <div className="sobre-page">
            <Navbar />
            <main className="sobre-main">
                <div className="sobre-hero">
                    <div className="sobre-logo-badge">
                        <span className="sobre-logo-icon">🌱</span>
                    </div>
                    <h1 className="sobre-hero-title">EconSciente</h1>
                    <p className="sobre-hero-tagline">Transformando hábitos, preservando o futuro</p>
                </div>

                <div className="sobre-card">
                    <div className="sobre-card-header">
                        <span className="sobre-card-icon">💡</span>
                        <h2 className="sobre-card-title">Nossa Missão</h2>
                    </div>
                    <p className="sobre-card-text">
                        Olá! Fui criado com o intuito de ajudar você a transformar hábitos de descarte e reciclagem em ações práticas de forma criativa!
                        Aqui, você encontrará informações simples e relevantes para esclarecer dúvidas, aprender a separar resíduos e descobrir os
                        benefícios da reciclagem para o meio ambiente e a sociedade.
                    </p>
                </div>

                <div className="sobre-card">
                    <div className="sobre-card-header">
                        <span className="sobre-card-icon">🎯</span>
                        <h2 className="sobre-card-title">Desafios e Recompensas</h2>
                    </div>
                    <p className="sobre-card-text">
                        A cada ação sustentável que você realizar, receberá desafios especiais! Complete-os e ganhe recompensas sensacionais,
                        além de acumular pontos e subir no ranking de guardiões do planeta.
                    </p>
                </div>

                <div className="sobre-features">
                    <h2 className="features-title">
                        <span>✨</span> O que você encontra aqui
                    </h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">📚</div>
                            <h3 className="feature-title">Educação</h3>
                            <p className="feature-desc">Aprenda sobre separação de resíduos e reciclagem</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📍</div>
                            <h3 className="feature-title">Localização</h3>
                            <p className="feature-desc">Encontre pontos de coleta próximos a você</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🏆</div>
                            <h3 className="feature-title">Gamificação</h3>
                            <p className="feature-desc">Ganhe pontos e conquiste badges especiais</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🤝</div>
                            <h3 className="feature-title">Comunidade</h3>
                            <p className="feature-desc">Faça parte de uma rede consciente</p>
                        </div>
                    </div>
                </div>

                <div className="sobre-cta">
                    <div className="cta-icon">🌍</div>
                    <h2 className="cta-title">Junte-se à Mudança!</h2>
                    <p className="cta-text">
                        Quero te mostrar o caminho para você fazer parte da transformação! Juntos, podemos diminuir o impacto ambiental e construir
                        um futuro mais sustentável. Eu sou consciente, e você?
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
