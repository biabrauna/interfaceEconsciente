
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './style.css';

function Separacao() {
  const trashColors = [
    { color: 'Azul', type: 'Papel e papelão', emoji: '📄', bgColor: '#0066CC' },
    { color: 'Verde', type: 'Vidros (garrafas, potes, cacos)', emoji: '🍾', bgColor: '#00A335' },
    { color: 'Amarela', type: 'Metais (latas, pregos, ferragens)', emoji: '🥫', bgColor: '#FFD700' },
    { color: 'Vermelha', type: 'Plásticos (embalagens, garrafas PET)', emoji: '🧴', bgColor: '#DC143C' },
    { color: 'Marrom', type: 'Resíduos orgânicos (restos de alimentos)', emoji: '🍎', bgColor: '#8B4513' },
    { color: 'Laranja', type: 'Resíduos perigosos (pilhas, baterias)', emoji: '🔋', bgColor: '#FF8C00' },
    { color: 'Branca', type: 'Resíduos hospitalares', emoji: '💉', bgColor: '#F5F5F5' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A211A 0%, #2a3a2a 100%)',
      paddingBottom: '80px'
    }}>
      <Navbar />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px 20px'
      }}>

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
            ♻️
          </div>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 12px 0',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            Como Separar o Lixo
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#EE9300',
            margin: '0'
          }}>
            Guia completo para reciclagem consciente
          </p>
        </div>

        <section style={{
          background: 'rgba(26, 33, 26, 0.95)',
          borderRadius: '20px',
          padding: '32px 24px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '600',
            color: '#EE9300',
            margin: '0 0 24px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🎨 Cores das Lixeiras
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {trashColors.map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(50, 52, 65, 0.4)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: `2px solid ${item.bgColor}33`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${item.bgColor}40`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
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
                    background: item.bgColor,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    boxShadow: `0 4px 12px ${item.bgColor}40`
                  }}>
                    {item.emoji}
                  </div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: item.bgColor === '#F5F5F5' ? '#333' : item.bgColor,
                    margin: '0'
                  }}>
                    {item.color}
                  </h3>
                </div>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.95rem',
                  margin: '0',
                  lineHeight: '1.5'
                }}>
                  {item.type}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          background: 'rgba(26, 33, 26, 0.95)',
          borderRadius: '20px',
          padding: '32px 24px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '600',
            color: '#EE9300',
            margin: '0 0 28px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📋 Como Separar
          </h2>

          <div style={{
            background: 'rgba(0, 163, 53, 0.15)',
            borderLeft: '4px solid #00A335',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#00d444',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🔄 Resíduos Inorgânicos
            </h3>
            <ol style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1rem',
              lineHeight: '1.8',
              paddingLeft: '20px',
              margin: '0'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: "#EE9300" }}>Separe por tipo:</strong> Plástico, papel, metal e vidro devem ficar separados!
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: "#EE9300" }}>Limpe e seque:</strong> Lave potes, garrafas e latas. Nada de resíduos orgânicos!
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: "#EE9300" }}>Economize espaço:</strong> Dobre papéis, achate garrafas e latas para render espaço.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: "#EE9300" }}>Cuidado com vidros:</strong> Embale vidros quebrados em jornal ou caixa.
              </li>
              <li>
                <strong style={{ color: "#EE9300" }}>Destine corretamente:</strong> Leve ao ponto de coleta seletiva mais próximo!
              </li>
            </ol>
          </div>

          <div style={{
            background: 'rgba(238, 147, 0, 0.15)',
            borderLeft: '4px solid #EE9300',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#ff9e00',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🍎 Resíduos Orgânicos
            </h3>
            <ol style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '1rem',
              lineHeight: '1.8',
              paddingLeft: '20px',
              margin: '0'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: "#00d444" }}>Identifique os resíduos:</strong> Restos de comida, cascas de frutas, legumes e folhas secas.
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: "#00d444" }}>Use um recipiente específico:</strong> Separe uma lixeira só para orgânicos com tampa!
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: "#00d444" }}>Evite misturas:</strong> Retire plásticos, metais ou vidros dos resíduos orgânicos!
              </li>
              <li>
                <strong style={{ color: "#00d444" }}>Destine corretamente:</strong> Use para adubo ou descarte em ponto de coleta.
              </li>
            </ol>
          </div>
        </section>

        <section style={{
          background: 'rgba(26, 33, 26, 0.95)',
          borderRadius: '20px',
          padding: '32px 24px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: '600',
            color: '#EE9300',
            margin: '0 0 24px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            💡 Ideias de Reutilização
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {[
              { icon: '🫙', title: 'Potes de vidro', desc: 'Armazene temperos, grãos ou objetos pequenos' },
              { icon: '📦', title: 'Caixas de papelão', desc: 'Organize ou use em artesanato personalizado' },
              { icon: '👕', title: 'Roupas velhas', desc: 'Transforme em panos de limpeza reutilizáveis' },
              { icon: '🥫', title: 'Latas de metal', desc: 'Porta-lápis, vasos ou porta-trecos decorados' },
              { icon: '🧴', title: 'Garrafas PET', desc: 'Crie vasos para mudas ou organizadores' },
              { icon: '⚙️', title: 'Tampas de garrafa', desc: 'Imãs, jogos educativos ou decorações' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(50, 52, 65, 0.4)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(238, 147, 0, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(238, 147, 0, 0.5)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(238, 147, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(238, 147, 0, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#EE9300',
                  margin: '0 0 8px 0',
                  textAlign: 'center'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.95rem',
                  margin: '0',
                  lineHeight: '1.5',
                  textAlign: 'center'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 163, 53, 0.2) 0%, rgba(0, 212, 68, 0.2) 100%)',
            border: '2px solid rgba(0, 163, 53, 0.4)',
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'white',
              fontSize: '1.05rem',
              fontWeight: '500',
              lineHeight: '1.6',
              margin: '0'
            }}>
              <strong style={{ color: '#00d444' }}>💚 Dica:</strong> Cada objeto tem potencial para ganhar uma nova função. Flua a criatividade e seja diferente!
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Separacao;
