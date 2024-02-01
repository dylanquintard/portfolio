import { useState } from "react";
import axios from "axios";
import '../styles/ContactForm.scss';

const ContactForm = () => {
  const [nomPrenom, setNomPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (nomPrenom === "" || email === "" || message === "") {
      alert("Please fill in all required fields.");
      return;
    }

    axios.post("https://api.quintarddylan.fr:4000/api/contact", {
      nomPrenom,
      email,
      message,
    })
      .then(response => {
        if (response.status === 201) {
          alert("Votre message a bien été envoyé !");
        } else {
          const error = response.data.error;
          alert(`Error: ${error}`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
      <input
        type="text"
        placeholder="Nom et prénom"
        value={nomPrenom}
        onChange={e => setNomPrenom(e.target.value)}
      />
      <input
        type="email"
        placeholder="Adresse e-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      </div>
      <div>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      </div>
      <div>
      <button type="submit">Envoyer</button>
      </div>
    </form>
  );
};

export default ContactForm;