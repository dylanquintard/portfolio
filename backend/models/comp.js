const mongoose = require('mongoose');

const compSchema = mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
});

module.exports = mongoose.model('Comp', compSchema);