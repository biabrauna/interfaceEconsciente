
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./style.css";

export default function Duvidas() {
    return (
        <div className="duvidas-container">
            <Navbar />
            <main className="duvidas-content">
                <h2>Possíveis dúvidas sobre reciclagem:</h2>
                <ol>
                    <li>
                        <strong>Posso reciclar papel engordurado?</strong>
                        <p>Não. Papéis sujos de gordura, como caixas de pizza, devem ir para o lixo orgânico ou compostagem.</p>
                    </li>
                    <li>
                        <strong>Preciso lavar tudo antes de reciclar?</strong>
                        <p>Sim! Lave potes, garrafas e latas para evitar odores e facilitar o processo.</p>
                    </li>
                    <li>
                        <strong>Vidro quebrado pode ser reciclado?</strong>
                        <p>Pode sim! mas embale em jornal ou caixa resistente antes de descartar.</p>
                    </li>
                    <li>
                        <strong>Todo plástico é reciclável?</strong>
                        <p>Não. Plásticos como isopor e sacos metalizados (de salgadinhos) nem sempre são aceitos.</p>
                    </li>
                    <li>
                        <strong>O que fazer com roupas velhas?</strong>
                        <p>Se não forem doadas, leve para programas de reciclagem têxtil ou reutilize como pano, ou até mesmo personalize!</p>
                    </li>
                    <li>
                        <strong>Pilhas e baterias vão na reciclagem?</strong>
                        <p>Não. Elas devem ser descartadas em pontos de coleta específicos para resíduos perigosos.</p>
                    </li>
                    <li>
                        <strong>Espelhos quebrados são recicláveis?</strong>
                        <p>Não são recicláveis. Embale bem e descarte com o lixo comum.</p>
                    </li>
                </ol>
                <p>
                    Caso haja dúvidas, não exite em nos procurar! Além disso, os pontos de coleta seletiva podem ajudar com as informações!
                </p>
            </main>
            <Footer />
        </div>
    );
}
