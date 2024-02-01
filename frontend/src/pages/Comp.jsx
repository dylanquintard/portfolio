import '../styles/Comp.scss';
import imgFrontend from '../images/view-web.svg';
import imgBackend from '../images/server.svg';
import Carroussel from '../components/Carroussel';
import SkillBar from '../components/SkillBar';

function Comp() {

  return (
    <div className='Comp'>
      <div>
        <h1>Mes compétences</h1>
      </div>
      <div className='Container'>
        <div className='upperElement'>
          <div className='frontend'>
            <img src={imgFrontend} alt='frontend'></img>
            <h1>Frontend</h1>
            <div className='textComp'>Il s'agit de la partie visible et interactive de l'application avec laquelle l'utilisateur interagit directement. Le frontend est généralement développé avec des langages comme HTML, CSS et JavaScript. Il s'exécute sur le navigateur web de l'utilisateur et gère l'interface utilisateur, la présentation des données et les interactions utilisateur.</div>
            <div className='carroussel'>
            <Carroussel category="frontend" />
            <SkillBar skill="HTML" percentage={90} />
            <SkillBar skill="CSS" percentage={90} />
            <SkillBar skill="Javascript" percentage={80} />
            <SkillBar skill="React" percentage={70} />
            </div>
          </div>
          <div className='backend'>
            <img src={imgBackend} alt='backend'></img>
            <h1>Backend</h1>
            <div className='textComp'>C'est la partie de l'application qui n'est pas directement accessible par l'utilisateur. Elle gère la logique métier, la manipulation des données, les opérations côté serveur et communique avec la base de données. Elle assure le traitement des requêtes du frontend, la gestion des données, la sécurité et d'autres fonctionnalités côté serveur.</div>
            <div className='carroussel'>
            <Carroussel category="backend" />
            <SkillBar skill="ExpressJS" percentage={70} />
            <SkillBar skill="NodeJS" percentage={70} />
            <SkillBar skill="Mongodb" percentage={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comp;