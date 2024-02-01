import { useState, useEffect, useCallback } from 'react';
import '../styles/About.scss';
import Collapse from '../components/Collapse';
import imgProfil from '../images/profil.png';
import Modal from '../components/Modal';
import imgBack from '../images/arrow-back-up.svg';
import cv from '../images/cv.webp';

function About() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  useEffect(() => {
    // Fermer la modal en appuyant sur "Escape"
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup effect
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

    return (
        <div className="about">
            <div className="containerProfil">
                <img className='imgProfil' src={imgProfil} alt="profil" />
                <div className="contentProfil">
                    <div className='topProfil'>
                        <div className='who'>Qui suis-je ?</div>
                        <div className='description'>Ancien diplômé en restauration et boulangerie, j'ai décidé de donner un nouveau cap à ma carrière en me lançant dans une formation de développeur web. Depuis ma jeunesse, le monde de l'informatique et du développement a toujours suscité mon intérêt. Openclassroom m'a offert l'opportunité d'approfondir mes connaissances sur le métier de développeur web, me permettant ainsi d'acquérir des compétences significatives dans ce domaine.</div>
                    </div>
                    <div>
                        <div onClick={openModal}><img className='cv' src={cv} alt='openmodal'></img></div>
                    </div>
                </div>
            </div>
            <div className='services'>
                <h4>Mes services</h4>
                <div className='collapsesServices'>
                    <Collapse
                        title ='Front-end'
                        content="- Création d'interfaces utilisateur interactives et réactives en utilisant React."
                        content2="- Intégration de conceptions graphiques dans des pages web en utilisant HTML5, CSS3 et JavaScript."
                        content3="- Optimisation des performances et de l'expérience utilisateur côté client." 
                    />
                    <Collapse
                        title ='Back-end'
                        content="- Mise en place de serveurs web en utilisant des frameworks comme Node.js, Express.js, ou d'autres solutions basées sur JavaScript."
                        content2="- Gestion des bases de données, par exemple en utilisant MongoDB."
                        content3="- Développement d'API (Application Programming Interfaces) pour permettre la communication entre le front-end et le back-end." 
                    />
                    <Collapse
                        title ='Bases de données'
                        content="- Conception et maintenance de bases de données non relationnelles."
                        content2="- Utilisation de langages de requête pour interagir avec les bases de données."
                    />
                    <Collapse
                        title ='Serveurs'
                        content="- Implémentation de la logique métier et des fonctionnalités côté serveur."
                        content2="- Gestion des sessions utilisateur, de l'authentification et de l'autorisation."
                    />
                    <Collapse
                        title ='Optimisation'
                        content="- Optimisation du code pour améliorer la vitesse de chargement et la réactivité de l'application."
                        content2="- Gestion de la mise en cache et d'autres techniques d'optimisation."
                    />
                    <Collapse
                        title ='Support technique'
                        content="- Maintenance continue de l'application pour assurer sa stabilité et sa sécurité."
                        content2="- Fourniture de support technique aux utilisateurs finaux."
                    />
                </div>
            </div>
            <Modal isOpen={modalOpen} onClose={closeModal}>
            <img className='closeModal' src={imgBack} alt='retour' onClick={closeModal}></img>
            <img className='cvModal' src={cv} alt='cv'></img>
            </Modal>
        </div>
    );
}

export default About;