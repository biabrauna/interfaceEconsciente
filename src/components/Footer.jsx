import { Link } from "react-router-dom";
import './style.css'
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy} from '@fortawesome/free-solid-svg-icons';
import { FaHome, FaCamera, FaMapMarkerAlt} from 'react-icons/fa';
export default function Navbar() {

    const { id } = useParams();
    return (
        <div className="nav-responsive-footer">
        <div className="menu-list-footer">
            <div className="circle"><Link to={`/Home/${id}`}><li><FaHome /></li></Link></div>
            <div className="circle"><Link to={`/Camera/${id}`}><li><FaCamera /> </li></Link></div>
            <div className="circle"><Link to={`/Localizacao/${id}`}><li><FaMapMarkerAlt /></li></Link></div>
            <div className="circle"><Link to={`/Ranking/${id}`}><li><FontAwesomeIcon icon={faTrophy} size="0.5x" /></li></Link></div>
        </div>
        </div>
    );

}