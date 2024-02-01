const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    nomPrenom: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);