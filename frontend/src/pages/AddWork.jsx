import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AddWork.scss';
import DashboardMenu from '../components/dashboardMenu';

const AddWork = () => {
  const [titre, setTitre] = useState("");
  const [lien, setLien] = useState("");
  const [annee, setAnnee] = useState("");
  const [type, settype] = useState("");
  const [description, setdescription] = useState("");
  const [tags, setTags] = useState("");
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

    if (titre === "" || lien === "" || annee === "" || type === "" || description === "" || tags === "") {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    const travailObject = {
      titre,
      lien,
      annee,
      type,
      description,
      tags,
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("travail", JSON.stringify(travailObject));

    const token = localStorage.getItem('token');

    axios.post("https://api.quintarddylan.fr:4000/api/works", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Le travail a été ajouté avec succès !");
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
    <div className="addWork">
      <h1>Ajouter un projet</h1>
      <DashboardMenu />
      <div className="addWorkBg">
      <div className="addWorkForm">
      <form onSubmit={handleSubmit}>
        {/* Champ Titre */}
        <label htmlFor="titre">Titre :</label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          required
        />

        {/* Champ Lien vers le site web */}
        <label htmlFor="lien">Lien vers le site web :</label>
        <input
          type="url"
          id="lien"
          name="lien"
          value={lien}
          onChange={e => setLien(e.target.value)}
          required
        />

        {/* Champ Année de création */}
        <label htmlFor="annee">Année de création :</label>
        <input
          type="number"
          id="annee"
          name="annee"
          value={annee}
          onChange={e => setAnnee(e.target.value)}
          required
        />

        {/* Champ Type */}
        <label htmlFor="type">Type :</label>
        <input
          type="text"
          id="type"
          name="type"
          value={type}
          onChange={e => settype(e.target.value)}
          required
        />

        {/* Champ Description */}
        <label htmlFor="annee">Description :</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={e => setdescription(e.target.value)}
          required
        />
        {/* Champ Tags */}
        <label htmlFor="tags">Tags des technologies utilisées (séparés par des espaces) :</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={tags}
          onChange={e => setTags(e.target.value)}
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
        <button type="submit">Ajouter le travail</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default AddWork;