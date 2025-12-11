import { Link } from "react-router-dom";
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy} from '@fortawesome/free-solid-svg-icons';
import { FaHome, FaCamera, FaMapMarkerAlt} from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="nav-responsive-footer">
                <div className="menu-list-footer">
                    <div className="circle"><Link to="/Home" aria-label="Ir para Home"><li><FaHome /></li></Link></div>
                    <div className="circle"><Link to="/Posts" aria-label="Ver Posts"><li><FaCamera /> </li></Link></div>
                    <div className="circle"><Link to="/Localizacao" aria-label="Ver Localização"><li><FaMapMarkerAlt /></li></Link></div>
                    <div className="circle"><Link to="/Ranking" aria-label="Ver Ranking"><li><FontAwesomeIcon icon={faTrophy} size="xs" /></li></Link></div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>© {currentYear} EcoConsciente. Todos os direitos reservados.</p>
                <p className="footer-links">
                    <Link to="/sobre">Sobre</Link> •
                    <Link to="/Duvidas">Ajuda</Link> •
                    <span onClick={() => window.open('https://github.com/econsciente', '_blank')} style={{ cursor: 'pointer' }}>GitHub</span>
                </p>
            </div>
        </>
    );
}