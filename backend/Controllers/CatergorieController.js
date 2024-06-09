const CategorieModel = require('../Models/CategorieModel');

class CategorieController {
  static getAllCategorie(req, res) {
    CategorieModel.getAllCategories((err, categorie) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(categorie);
      }
    });
  }

  static getCategorieById(req, res) {
    CategorieModel.getCategorieById(req.params.id, (err, categorie) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!categorie) {
        res.json({ message: 'Categorie introuvable.' });
      } else {
        res.json(categorie);
        console.log(categorie);
      }
    });
  }

  static createCategorie(req, res) {
    CategorieModel.createCategorie(req.body, (err, categorie) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(categorie);
      }
    });
  }

  static updateCategorie(req, res) {
    CategorieModel.updateCategorie(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deleteCategorie(req, res) {
    CategorieModel.deleteCategorie(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }
}

module.exports = CategorieController;

