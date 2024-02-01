import PropTypes from 'prop-types';
import deleteIcon from '../images/delete.svg';
import imgBack from '../images/arrow-back-up.svg';
import Modal from '../components/Modal';
import editImg from '../images/edit.svg'
import { useState, useEffect, useCallback } from 'react';
import '../styles/WorkTable.scss';
import { Link } from 'react-router-dom';

function WorksTable({ works, deleteWork }) {
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
      <div className='dashboardSection'>
        <h2>Travaux</h2>
        <div className='workTable'>
          {works.map((work) => (
            <div key={work._id} className="workItem">
              <div className='workTitle'>{work.titre}</div>
                <div className='workButtons'>
                  <div onClick={openModal} className='editButton'>
                    <Link className='link' to={`/editwork/${work._id}`} key={work._id}>
                    <img className='edit' src={editImg} alt='openmodal'></img>
                    </Link>
                  </div>
                    <img src={deleteIcon} alt="delete" onClick={() => deleteWork(work._id)} className='deleteButton' />
                </div>
              </div>
          ))}
            </div>
        <Modal isOpen={modalOpen} onClose={closeModal}>
            <img className='closeModal' src={imgBack} alt='retour' onClick={closeModal}></img>
        </Modal>
      </div>
    );
}

WorksTable.propTypes = {
  works: PropTypes.array.isRequired,
  deleteWork: PropTypes.func.isRequired,
};

export default WorksTable;