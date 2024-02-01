// Importer le module Express et créer un routeur Express
const express = require('express');
const router = express.Router(); 

// Importer le contrôleur des opérations CRUD pour les book
const contactCtrl = require('../controllers/contact');

// Définir les routes avec les méthodes HTTP correspondantes et les gestionnaires de contrôle
router.post('/', contactCtrl.sendContact);

// Récupérer tous les messages de contact
router.get('/', contactCtrl.getContact);

// Supprimer un message de contact par ID
router.delete('/:id', contactCtrl.deleteContact);

// Exporter le routeur
module.exports = router;