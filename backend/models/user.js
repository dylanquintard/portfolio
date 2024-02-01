// Importer le module mongoose
const mongoose = require('mongoose');


// Définir le schéma de données pour les utilisateurs
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Créer un modèle MongoDB appelé 'User' basé sur le schéma défini
module.exports = mongoose.model('User', userSchema);