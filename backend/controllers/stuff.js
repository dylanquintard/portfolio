const sharp = require('sharp');
const Travaux = require('../models/Travaux');  // Assurez-vous d'ajuster le chemin

exports.sendWork = async (req, res, next) => {
  try {
    if (!req.body.travail) {
      throw new Error("Les données du travail sont manquantes.");
    }
    const travailObject = JSON.parse(req.body.travail);
    delete travailObject._id;

    // Utilisation de Sharp pour la compression et la conversion en webp
    const { buffer } = req.file;
    const timestamp = Date.now();
    const fileName = `${timestamp}.webp`;
    const outputPath = `./files/${fileName}`;

    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile(outputPath);

    const nouveauTravail = new Travaux(travailObject);
    nouveauTravail.image = `/files/${fileName}`;

    await nouveauTravail.save();

    res.status(201).json({ message: 'Travail enregistré !' });
  } catch (error) {
    console.error(error.message);
    console.error(req.body);
    console.error(req.file);
    res.status(400).json({ error: 'Erreur lors de la création du travail' });
  }
};

exports.getAllWorks = (req, res, next) => {
    Travaux.find().then(
      (travaux) => {
        res.status(200).json(travaux);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.getOneWork = (req, res, next) => {
    Travaux.findOne({
      _id: req.params.id
    }).then(
      (work) => {
        res.status(200).json(work);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.modifyWork = async (req, res, next) => {
  try {
    const workObject = req.file ? {
      ...JSON.parse(req.body.work),
      image: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
  } : { ...req.body };

    if (req.file) {
      // Utilisation de Sharp pour la compression et la conversion en webp
      const { buffer } = req.file;
      const timestamp = Date.now();
      const fileName = `${timestamp}.webp`;
      const outputPath = `./files/${fileName}`;

      await sharp(buffer)
        .webp({ quality: 20 })
        .toFile(outputPath);

      // Mise à jour de l'URL de l'image avec le nouveau fichier webp
      workObject.image = `/files/${fileName}`;
    }

    await Travaux.updateOne({ _id: req.params.id }, { ...workObject, _id: req.params.id });
    res.status(200).json({ message: 'Objet modifié!' });
  } catch (error) {
    console.error(error.message);
    console.error(req.body);
    console.error(req.file);
    res.status(500).json({ error: 'Erreur lors de la modification du travail' });
  }
};

exports.deleteWork = (req, res, next) => {
  Travaux.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Travail supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};