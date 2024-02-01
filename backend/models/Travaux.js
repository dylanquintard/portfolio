const mongoose = require('mongoose');

const travauxSchema = mongoose.Schema({
    titre: { type: String, required: true },
    lien: { type: String, required: true },
    image: { type: String },
    annee: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
});

module.exports = mongoose.model('Travail', travauxSchema);