const Contact = require('../models/Contact');

// Contrôleur pour l'envoi de message de contact
  exports.sendContact = async (req, res, next) => {
    const contact = new Contact({
      ...req.body
    });
  
    contact.save()
      .then(() => res.status(201).json({ message: "Message envoyé !"}))
      .catch(error => res.status(400).json({ error }));
};
  
  // Contrôleur pour récupérer tous les messages de contact
exports.getContact = async (req, res, next) => {
    Contact.find()
      .then(contacts => res.status(200).json(contacts))
      .catch(error => res.status(400).json({ error }));
};
  
  // Contrôleur pour supprimer un message de contact par ID
exports.deleteContact = async (req, res, next) => {
    Contact.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Message supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};
