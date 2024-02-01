import '../styles/Contact.scss';
import ContactForm from '../components/ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';

function Contact() {
    return (
      <div className='contact'>
        <div>
          <h1>Vous souhaitez en savoir plus ? Contactez moi !</h1>
        </div>
        <div className='contactForm'>
          <ContactForm />
          <div className='infocontact'>
            <div><FontAwesomeIcon icon={faEnvelopeOpenText} /> quintarddylan@gmail.com</div>
            <div><FontAwesomeIcon icon={faPhone} /> 07 49 34 70 12</div>
            <div><FontAwesomeIcon icon={faLocation} /> 81100 Castres</div>
          </div>
        </div>
      </div>
    );
}

export default Contact;