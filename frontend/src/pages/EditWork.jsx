import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/EditWork.scss';
import DashboardMenu from '../components/dashboardMenu';

const EditWork = () => {
  const { id } = useParams();
  const [work, setWork] = useState({});
  const [notFound, setNotFound] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {

      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`https://api.quintarddylan.fr:4000/api/works/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data) {
          throw new Error('Network response was not ok');
        }

        const workData = response.data;

        setWork(workData);

        // Pré-remplissage des champs du formulaire avec les données récupérées
        setTitre(workData.titre || "");
        setLien(workData.lien || "");
        setAnnee(workData.annee || "");
        settype(workData.type || "");
        setdescription(workData.description || "");
        setTags(workData.tags || "");
      } catch (error) {
        console.error('Error loading data:', error);
        setNotFound(true);
      } finally {
      }
    };

    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ici la logique pour envoyer les données mises à jour au backend
    // Utilisez work._id pour identifier le travail à mettre à jour

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

    axios.put(`https://api.quintarddylan.fr:4000/api/works/${travail._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Le travail a été mis à jour avec succès !");
        } else {
          const error = response.data.error;
          alert(`Erreur : ${error}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (notFound) {
    return <div>Travail non trouvé</div>;
  }

  return (
    <div className="editWork">
      <h1>Modifier un projet</h1>
      <DashboardMenu />
      <div className="editWorkBg">
        <div className="editWorkForm">
          <form onSubmit={handleSubmit}>
            <label htmlFor="titre">Titre :</label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />
  
            <label htmlFor="lien">Lien vers le site web :</label>
            <input
              type="url"
              id="lien"
              name="lien"
              value={lien}
              onChange={(e) => setLien(e.target.value)}
              required
            />
  
            <label htmlFor="annee">Année de création :</label>
            <input
              type="number"
              id="annee"
              name="annee"
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              required
            />
  
            <label htmlFor="type">Type :</label>
            <input
              type="text"
              id="type"
              name="type"
              value={type}
              onChange={(e) => settype(e.target.value)}
              required
            />
  
            <label htmlFor="annee">Description :</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
            />
  
            <label htmlFor="tags">Tags des technologies utilisées (séparés par des espaces) :</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
  
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
  
            <button type="submit">Enregistrer les modifications</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWork;
