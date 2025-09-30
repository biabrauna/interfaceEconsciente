
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./style.css";

export default function Duvidas() {
    const faqs = [
        {
            icon: "📄",
            question: "Posso reciclar papel engordurado?",
            answer: "Não. Papéis sujos de gordura, como caixas de pizza, devem ir para o lixo orgânico ou compostagem."
        },
        {
            icon: "🧼",
            question: "Preciso lavar tudo antes de reciclar?",
            answer: "Sim! Lave potes, garrafas e latas para evitar odores e facilitar o processo."
        },
        {
            icon: "🔨",
            question: "Vidro quebrado pode ser reciclado?",
            answer: "Pode sim! mas embale em jornal ou caixa resistente antes de descartar."
        },
        {
            icon: "♻️",
            question: "Todo plástico é reciclável?",
            answer: "Não. Plásticos como isopor e sacos metalizados (de salgadinhos) nem sempre são aceitos."
        },
        {
            icon: "👕",
            question: "O que fazer com roupas velhas?",
            answer: "Se não forem doadas, leve para programas de reciclagem têxtil ou reutilize como pano, ou até mesmo personalize!"
        },
        {
            icon: "🔋",
            question: "Pilhas e baterias vão na reciclagem?",
            answer: "Não. Elas devem ser descartadas em pontos de coleta específicos para resíduos perigosos."
        },
        {
            icon: "🪞",
            question: "Espelhos quebrados são recicláveis?",
            answer: "Não são recicláveis. Embale bem e descarte com o lixo comum."
        }
    ];

    return (
        <div className="duvidas-page">
            <Navbar />
            <main className="duvidas-main">
                <div className="duvidas-header">
                    <div className="duvidas-icon-badge">❓</div>
                    <h1 className="duvidas-title">Dúvidas Frequentes</h1>
                    <p className="duvidas-subtitle">Tire suas dúvidas sobre reciclagem</p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-card">
                            <div className="faq-question-row">
                                <span className="faq-icon">{faq.icon}</span>
                                <h3 className="faq-question">{faq.question}</h3>
                            </div>
                            <p className="faq-answer">{faq.answer}</p>
                        </div>
                    ))}
                </div>

                <div className="duvidas-footer-card">
                    <div className="footer-card-icon">💬</div>
                    <p className="footer-card-text">
                        Caso tenha mais dúvidas, não hesite em nos procurar! Além disso, os pontos de coleta seletiva podem ajudar com as informações!
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
