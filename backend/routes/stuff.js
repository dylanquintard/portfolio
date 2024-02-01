// Importer le module Express et créer un routeur Express
const express = require('express');
const router = express.Router(); 

// Importer le de configuration multer
const multer = require('../Middlewares/multer-config');

// Importer le contrôleur des opérations CRUD pour les book
const workCtrl = require('../controllers/stuff');

// Définir les routes avec les méthodes HTTP correspondantes et les gestionnaires de contrôle
router.post('/', multer, workCtrl.sendWork);

// Obtenir tous les works
router.get('/', workCtrl.getAllWorks);

// Obtenir un work par son ID
router.get('/:id', workCtrl.getOneWork);

router.put('/:id', multer, workCtrl.modifyWork);

// Supprimer un work par ID
router.delete('/:id', workCtrl.deleteWork);

// Exporter le routeur
module.exports = router;