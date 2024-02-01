import { useState, useEffect } from 'react';

const Carroussel = ({ category }) => {
    const [comps, setComps] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const fetchComps = async () => {
        try {
          const response = await fetch(`https://api.quintarddylan.fr:4000/api/comps/category=${category}`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
          const data = await response.json();
          setComps(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchComps();
    }, [category]);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % comps.length);
      }, 1500); // 1000ms = 1 second
  
      return () => {
        clearInterval(intervalId);
      };
    }, [comps]);
  
    return (
        <div>
          <div>
            {comps.length > 0 && (
              <div>
                <img key={comps[currentIndex]._id} src={comps[currentIndex].image} alt={comps[currentIndex].title} />
              </div>
            )}
          </div>
        </div>
      );
    };
    
    export default Carroussel;