import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/dashboard.scss';
import MessagesTable from '../components/MessageTable';
import WorksTable from '../components/WorkTable';
import DashboardMenu from '../components/dashboardMenu';

function Dashboard() {
  const [works, setWorks] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch works
        const worksResponse = await axios.get('https://api.quintarddylan.fr:4000/api/works', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setWorks(worksResponse.data);

        // Fetch messages
        const messagesResponse = await axios.get('https://api.quintarddylan.fr:4000/api/contact', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(messagesResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('https://api.quintarddylan.fr:4000/api/contact', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.status);

        if (response.status === 200) {
          const fetchedMessages = response.data;
          setMessages(fetchedMessages);
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    getMessages();
  }, []);

  const deleteMessage = async (messageId) => {
    const apiUrl = `https://api.quintarddylan.fr:4000/api/contact/${String(messageId)}`;
  
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
  
      // Send the DELETE request to the API
      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

        // Vérification du code de réponse
        if (response.status === 200) {
            const updatedMessages = messages.filter(message => message._id !== messageId);
            setMessages(updatedMessages);

            const updatedResponse = await axios.get('https://api.quintarddylan.fr:4000/api/contact', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (updatedResponse.status === 200) {
                const fetchedMessages = updatedResponse.data;
                setMessages(fetchedMessages);
            } else {
                console.error(`Échec de la récupération des messages après suppression. Code de réponse : ${updatedResponse.status}`);
            }
        } else {
            console.error(`Échec de la suppression. Code de réponse : ${response.status}`);
        }
    } catch (error) {
        console.error(`Une erreur s'est produite : ${error.message}`);
    }
};

async function deleteWork(workId) {
  const apiUrl = `https://api.quintarddylan.fr:4000/api/works/${workId}`;

  try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(apiUrl, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.status === 200) {
          console.log('La suppression a été effectuée avec succès.');
          
          // Mettre à jour la liste des travaux dans le composant
          const updatedWorks = works.filter(work => work._id !== workId);
          setWorks(updatedWorks);
      } else {
          console.error(`Erreur lors de la suppression : ${response.status} - ${response.statusText}`);
      }
  } catch (error) {
      console.error(`Une erreur s'est produite lors de la suppression : ${error.message}`);
  }
}

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <DashboardMenu />
      <div className='dashboardSections'>
        <div className='dashboardSection'>
          <MessagesTable messages={messages} deleteMessage={deleteMessage} />
        </div>
        <div className='dashboardSection'>
          <WorksTable works={works} deleteWork={deleteWork} />
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
    works: PropTypes.shape({
      title: PropTypes.string,
    }),
    messages: PropTypes.shape({
        nomPrenom: PropTypes.string,
        email: PropTypes.string,
        message: PropTypes.string,
      }),
  };

export default Dashboard;