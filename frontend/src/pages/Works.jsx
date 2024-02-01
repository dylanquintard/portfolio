import '../styles/Works.scss'
import WorksCard from '../components/WorksCard';

function Works() {
    return (
        <div>
            <h1>Mes projets</h1>
            <div className='works'>
                <WorksCard />
            </div>
        </div>
      );
}

export default Works