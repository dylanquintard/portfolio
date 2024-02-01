import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/WorksCard.scss'

function WorksCard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get('https://api.quintarddylan.fr:4000/api/works', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.status);

        if (response.status === 200) {
          const fetchedCards = response.data;
          setCards(fetchedCards);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    getCards();
  }, []);

  return (
    <div className="worksCard">
      {cards.map((card) => (
        <div className='Card'>
        <Link className='linkCard' to={`/works/${card._id}`} key={card._id}>
          <img className="cardImage" src={card.image} alt="work" />
          <h2>{card.titre}</h2>
        </Link>
        </div>
      ))}
    </div>
  );
}

WorksCard.propTypes = {
  works: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default WorksCard;