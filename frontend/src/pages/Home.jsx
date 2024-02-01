import '../styles/Home.scss'
import { NavLink } from 'react-router-dom';
import banner from '../images/banner.webp'
import Button from '../components/Button';

function Home() {
    return (
        <div className='home'>
            <div className='aboutHome'>
                <div>
                    <h1>Quintard Dylan</h1>
                    <h2>Développeur web et web mobile fullstack</h2>
                    <div className='description'>Bienvenue dans mon portfolio professionnel, j'aime travailler sur de nouveaux projets et apprendre de nouvelles choses. Ici vous trouverez toutes les informations concernant mon travail.</div>
                </div>
                <div className='buttonsHome'>
                    <NavLink to="https://github.com/dylanquintard" target="_blank"><Button text='github' /></NavLink>
                    <NavLink to="/contact"><Button text='Me Contacter' /></NavLink>
                </div>
            </div>
            <div className='banner'><img src={banner} alt='banner'></img></div>
        </div>
      );
}

export default Home