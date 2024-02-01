import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import imgArrow from '../images/arrow-back-up.svg';
import '../styles/Work.scss';

const Work = () => {
  const { id } = useParams();
  const [work, setWork] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        
        const token = localStorage.getItem('token');

        const response = await fetch(`https://api.quintarddylan.fr:4000/api/works/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();

        if (jsonData) {
          setWork(jsonData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (notFound) {
    return <div>Travail non trouvé</div>;
  }

  return (
    <div className="work">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
<div className="workItem">
  <div className="workTitle">
    <h1>{work.titre}</h1>
    <NavLink to="/works">
      <img src={imgArrow} alt="arrowback" />
    </NavLink>
  </div>
  <div className="workDetails">
    <div className="workImage">
      <img src={work.image} alt={work.titre} />
      <div className="tagsAndYear">
        <div className="tags">
          {work.tags.split(' ').map((tag, index) => (
            <div className="tag" key={index}>#{tag}</div>
          ))}
        </div>
      </div>
    </div>
    <div className="workDetails2">
    <div className="year"><h4>Année : </h4>{work.annee}</div>
    <div className="year"><h4>Type :</h4>{work.type}</div>
      <div className="description"><h4>Description :</h4>{work.description}</div>
      <div className="link">
        <a href={work.lien} target="_blank" rel="noopener noreferrer">
          {work.lien}
        </a>
      </div>
    </div>
  </div>
</div>
        </>
      )}
    </div>
  );
};

export default Work;