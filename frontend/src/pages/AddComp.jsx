import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AddComp.scss';
import DashboardMenu from '../components/dashboardMenu';

const AddComp = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (title === "" || category === "") {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    const compObject = {
      title,
      category,
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("comp", JSON.stringify(compObject));

    const token = localStorage.getItem('token');

    axios.post("https://api.quintarddylan.fr:4000/api/comps", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("La compétence a été ajoutée avec succès !");
        } else {
          const error = response.data.error;
          alert(`Erreur : ${error}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="addComp">
      <h1>Ajouter une compétence</h1>
      <DashboardMenu />
      <div className="addCompBg">
      <div className="addCompForm">
      <form onSubmit={handleSubmit}>
        {/* Champ Titre */}
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        {/* Champ Type */}
        <label htmlFor="category">Catégorie (frontend ou backend) :</label>
        <input
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />

        {/* Upload Image */}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Bouton Soumettre */}
        <button type="submit">Ajouter la compétence</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default AddComp;