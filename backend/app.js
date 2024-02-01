const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const worksRoutes  = require('./routes/stuff')
const contactRoutes = require('./routes/contact');
const compRoutes = require('./routes/comp');
const path = require('path');

mongoose.connect('mongodb+srv://quintarddylan:iPBaz0YTfgHit312@cluster0.lzaxby6.mongodb.net/?retryWrites=true&w=majority',
    )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api/auth', userRoutes)
app.use('/api/contact', contactRoutes); // Utiliser les routes spécifiées pour gérer les endpoints contact
app.use('/api/comps', compRoutes);
app.use('/api/works', worksRoutes);
app.use('/files', express.static(path.join(__dirname, 'files')));


module.exports = app;
