import { useState } from 'react';
import PropTypes from 'prop-types';

function MessagesTable({ messages, deleteMessage }) {
  const [visibleMessages, setVisibleMessages] = useState({});

  const toggleMessageVisibility = (messageId) => {
    setVisibleMessages((prevVisibleMessages) => ({
      ...prevVisibleMessages,
      [messageId]: !prevVisibleMessages[messageId],
    }));
  };

  return (
    <div className='dashboardSection'>
      <h2>Messages</h2>
      <div className='messages'>
        {messages.map((message) => (
          <div className='messageBox' key={message._id}>
            <div className='info'>
              <div className='nomPrenom'>{message.nomPrenom}</div>
              <div className='email'>{message.email}</div>
            </div>
            <div className='message' style={{ display: visibleMessages[message._id] ? 'block' : 'none' }}>
              {message.message}
            </div>
            <div className='buttonContainer'>
              <button className='toggleButton' onClick={() => toggleMessageVisibility(message._id)}>
                {visibleMessages[message._id] ? 'Masquer' : 'Afficher'} le message
              </button>
              <button className='deleteButton' onClick={() => deleteMessage(message._id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

MessagesTable.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteMessage: PropTypes.func.isRequired,
};

export default MessagesTable;