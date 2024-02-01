// Importer le module Express et créer un routeur Express
const express = require('express');
const router = express.Router(); 

// Importer le contrôleur des opérations CRUD pour les book
const compCtrl = require('../controllers/comp');
const multer = require('../Middlewares/multer-config');

// Définir les routes avec les méthodes HTTP correspondantes et les gestionnaires de contrôle
router.post('/', multer, compCtrl.sendComp);

// Récupérer tous les messages de contact
router.get('/', compCtrl.getComp);

router.get('/category=:category', compCtrl.getCompByCategory);

// Supprimer un message de contact par ID
router.delete('/:id', compCtrl.deleteComp);

// Exporter le routeur
module.exports = router;