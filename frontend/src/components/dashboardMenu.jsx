import { Link, useLocation } from 'react-router-dom';
import '../styles/dashboardMenu.scss';

const DashboardMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  function handleLogout() {
    try {
      // Supprimer le jeton du localStorage
      localStorage.removeItem('token');
      
      // Rediriger vers la page de connexion
      window.location.href = '/login';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  }
  

  return (
    <div className='dashboardMenu'>
      {currentPath !== '/dashboard' && <Link to="/dashboard" className='linkDashboard'>Dashboard</Link>}
      {currentPath !== '/addwork' && <Link to="/addwork" className='linkDashboard'>Ajouter un projet</Link>}
      {currentPath !== '/addcomp' && <Link to="/addcomp" className='linkDashboard'>Ajouter une compétence</Link>}
      <div onClick={handleLogout} className='linkDashboard'>Se déconnecter</div>
    </div>
  );
}

export default DashboardMenu;