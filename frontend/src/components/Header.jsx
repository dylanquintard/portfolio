import '../styles/Header.scss';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png'

function Header() {
    return ( 
    <div className='header'>
        <div>
            <img src={logo} className='logo' alt='logo'></img>
        </div>
        <div className='links'>
            <NavLink to="/" className='link'>Accueil</NavLink>
            <NavLink to="/about" className='link'>À propos</NavLink>
            <NavLink to="/works" className='link'>Portfolio</NavLink>
            <NavLink to="/comp" className='link'>Compétences</NavLink>
            <NavLink to="/contact" className='link'>Contact</NavLink>
        </div>
    </div>
    );
}

export default Header