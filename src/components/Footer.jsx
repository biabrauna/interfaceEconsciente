import { Link } from "react-router-dom";
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy} from '@fortawesome/free-solid-svg-icons';
import { FaHome, FaCamera, FaMapMarkerAlt} from 'react-icons/fa';
export default function Footer() {
    return (
        <div className="nav-responsive-footer">
        <div className="menu-list-footer">
            <div className="circle"><Link to={`/Home`}><li><FaHome /></li></Link></div>
            <div className="circle"><Link to={`/Camera`}><li><FaCamera /> </li></Link></div>
            <div className="circle"><Link to={`/Localizacao`}><li><FaMapMarkerAlt /></li></Link></div>
            <div className="circle"><Link to={`/Ranking`}><li><FontAwesomeIcon icon={faTrophy} size="xs" /></li></Link></div>
        </div>
        </div>
    );

}