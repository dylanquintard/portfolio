import { useState, useEffect, useCallback } from 'react';
import '../styles/Modal.scss'

const Modal = ({ isOpen, onClose, children }) => {
  const [modal, setModal] = useState(null);

  const closeModal = useCallback(() => {
    if (modal === null) return;
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    setModal(null);
  }, [modal]);

  const openModal = useCallback(() => {
    const target = document.querySelector("#modal1");
    if (target) {
      target.style.display = null;
      target.setAttribute('aria-hidden', 'true');
      target.setAttribute('aria-modal', 'true');
      setModal(target);
      target.addEventListener('click', closeModal);
      target.querySelector('.js-modal-close').addEventListener('click', closeModal);
      target.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    }
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }

    // Cleanup effect
    return () => {
      if (modal) {
        modal.removeEventListener('click', closeModal);
      }
    };
  }, [isOpen, modal, openModal, closeModal]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

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
    <>
      {isOpen && (
        <div className='modal'>
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;