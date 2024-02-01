import '../styles/Error.scss'
import { Link } from 'react-router-dom';

const Error = () => {

    return (
        <main>
            <div className='error'>
                <h1>404</h1>
                <p>Oups! La page que vous demandez n'existe pas.</p>
                <div className='linkError'>
                <Link to='/'>Retourner sur la page d'accueil</Link>
                </div>
            </div>
        </main>
    );
  };
  
  export default Error;