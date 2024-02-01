const Comp = require('../models/comp');
const fs = require('fs');
const path = require('path');

exports.sendComp = async (req, res, next) => {
    try {
      // Extraire les champs du formulaire
      const { title, category } = JSON.parse(req.body.comp);
  
      // Utilisation de Sharp pour la conversion en webp
      const { buffer, originalname } = req.file;
      const timestamp = Date.now();
      const fileExtension = path.extname(originalname);
      const fileName = `${timestamp}${fileExtension}`;
      const outputPath = `./files/${fileName}`;
  
      // Enregistrer le fichier tel quel sans modification
      fs.writeFileSync(outputPath, buffer);
  
      // Créer une nouvelle instance du modèle Comp
      const comp = new Comp({
        title,
        category,
        image: `/files/${fileName}`
      });
  
      // Enregistrer l'instance dans la base de données
      const savedComp = await comp.save();
  
      // Répondre avec succès
      res.status(201).json({ message: "Comp ajouté avec succès !", comp: savedComp });
    } catch (error) {
      // Gérer les erreurs
      console.error(error.message);
      console.error(req.body);
      console.error(req.file);
      res.status(400).json({ error: 'Erreur lors de la création de la compétence' });
    }
};

exports.getCompByCategory = async (req, res) => {
  try {
      const { category } = req.params;
      const comps = await Comp.find({ category });
      res.json(comps);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
};
  
  // Contrôleur pour récupérer tous les messages de contact
exports.getComp= async (req, res, next) => {
    Comp.find()
      .then(comps => res.status(200).json(comps))
      .catch(error => res.status(400).json({ error }));
};
  
  // Contrôleur pour supprimer un message de contact par ID
exports.deleteComp = async (req, res, next) => {
    Comp.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Message supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};
