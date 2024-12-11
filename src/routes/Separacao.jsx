
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './style.css';

function Separacao() {
  return (
    <div className="container">
      <Navbar />
      <h2>Como Separar o Lixo</h2>
      <section className="colors">
        <h3>Cores das Lixeiras</h3>
        <table>
          <thead>
            <tr>
              <th>Cor</th>
              <th>Tipo de Resíduo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Azul</td>
              <td>Papel e papelão</td>
            </tr>
            <tr>
              <td>Verde</td>
              <td>Vidros (garrafas, potes, cacos, etc.)</td>
            </tr>
            <tr>
              <td>Amarela</td>
              <td>Metais (latas, pregos, ferragens)</td>
            </tr>
            <tr>
              <td>Vermelha</td>
              <td>Plásticos (embalagens, garrafas PET)</td>
            </tr>
            <tr>
              <td>Marrom</td>
              <td>Resíduos orgânicos (restos de alimentos, cascas)</td>
            </tr>
            <tr>
              <td>Laranja</td>
              <td>Resíduos perigosos (pilhas, baterias)</td>
            </tr>
            <tr>
              <td>Branca</td>
              <td>Resíduos hospitalares</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="instructions">
        <h2>Como Separar</h2>
        <h3>Resíduos Inorgânicos</h3>
        <ol>
          <li><span style={{ color: "#EE9300" }}>Separe por tipo:</span> Plástico, papel, metal e vidro devem ficar separados!</li>
          <li><span style={{ color: "#EE9300" }}>Limpe e seque:</span> Lave potes, garrafas e latas. Nada de resíduos orgânicos!</li>
          <li><span style={{ color: "#EE9300" }}>Economize espaço:</span> Dobre papéis, achate garrafas e latas para render espaço.</li>
          <li><span style={{ color: "#EE9300" }}>Cuidado com vidros:</span> Embale vidros quebrados em jornal ou caixa, leve-os também para a reciclagem.</li>
          <li><span style={{ color: "#EE9300" }}>Destine corretamente:</span> Leve ao ponto de coleta seletiva mais próximo a você!</li>
        </ol>
        <h3>Resíduos Orgânicos</h3>
        <ol>
          <li><span style={{ color: "#EE9300" }}>Identifique os resíduos:</span> Restos de comida, cascas de frutas, legumes, folhas secas e tudo envolvendo alimentos.</li>
          <li><span style={{ color: "#EE9300" }}>Use um recipiente específico:</span> Separe uma lixeira só para orgânicos com tampa para evitar odores ruins!</li>
          <li><span style={{ color: "#EE9300" }}>Evite misturas:</span> Retire os plásticos, metais ou vidros dos resíduos orgânicos!</li>
          <li><span style={{ color: "#EE9300" }}>Destine corretamente:</span> Use os resíduos para adubo ou descarte corretamente em um ponto de coleta seletiva mais próximo a você!</li>
        </ol>
      </section>

      <section className="reuse">
        <h2>Ideias de Reutilização</h2>
        <ul>
          <li><strong style={{color: "#EE9300"}}>Potes de vidro:</strong> Transforme em potes para armazenar temperos, grãos ou objetos pequenos.</li>
          <li><strong style={{color: "#EE9300"}}>Caixas de papelão:</strong> Use para organizar itens em casa ou como material para artesanato, personalize!</li>
          <li><strong style={{color: "#EE9300"}}>Roupas velhas:</strong> Corte e transforme em panos de limpeza.</li>
          <li><strong style={{color: "#EE9300"}}>Latas de metal:</strong> Decore e use como porta-lápis, vasos para plantas ou porta-trecos.</li>
          <li><strong style={{color: "#EE9300"}}>Garrafas PET:</strong> Crie vasos para mudas ou porta-moedas, também utilize para guardar água na geladeira.</li>
          <li><strong style={{color: "#EE9300"}}>Tampas de garrafa:</strong> Faça imãs de geladeira, jogos educativos ou decorações criativas.</li>
          <li><strong style={{color: "#EE9300"}}>Papel usado:</strong> Reaproveite para anotações, listas ou faça blocos de rascunho, utilize para colagens!</li>
          <li><strong style={{color: "#EE9300"}}>CDs antigos:</strong> Use como base para artesanato, espelhos decorativos e faça pinturas.</li>
          <li><strong style={{color: "#EE9300"}}>Escovas de dente usadas:</strong> Limpe e use para esfregar cantos de difícil acesso ou limpar joias.</li>
          <li><strong style={{color: "#EE9300"}}>Caixas de ovos:</strong> Transforme em organizadores para bijuterias, sementes ou tinta para pintura.</li>
          <li><strong style={{color: "#EE9300"}}>Tubos de papel higiênico:</strong> Use para organizar cabos, como suporte para mudas de plantas ou projetos escolares.</li>
          <li><strong style={{color: "#EE9300"}}>Garrafas de vidro:</strong> Decore e use como vasos, luminárias ou garrafas reutilizáveis.</li>
          <li><strong style={{color: "#EE9300"}}>Pneus usados:</strong> Faça vasos grandes para jardim, camas para pets ou assentos rústicos.</li>
          <li><strong style={{color: "#EE9300"}}>Jornais e revistas:</strong> Use em artesanato, embrulhos de presente ou colagens!</li>
          <li><strong style={{color: "#EE9300"}}>Canecas ou copos quebrados:</strong> Use como suporte para pincéis.</li>
        </ul>
        <p><strong>Dica:</strong> Cada objeto tem potencial para ganhar uma nova função. Flua a criatividade e seja diferente!</p>
      </section>
      <Footer />
    </div>
  );
}

export default Separacao;
