
const FournisseursModel = require('../Models/FournisseursModel');

class FournisseursController {
  static getAllFournisseur(req, res) {
    FournisseursModel.getAllFournisseurs((err, fournisseur) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(fournisseur);
      }
    });
  }

  static getFournisseurById(req, res) {
    FournisseursModel.getFournisseurById(req.params.id, (err, fournisseur) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!fournisseur) {
        res.json({ message: 'Fournisseur introuvable.' });
      } else {
        res.json(fournisseur);
      }
    });
  }

  static createFournisseur(req, res) {
    FournisseursModel.createFournisseurs(req.body, (err, fournisseur) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(fournisseur);
      }
    });
  }

  static updateFournisseur(req, res) {
    FournisseursModel.updateFournisseur(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deleteFournisseur(req, res) {
    FournisseursModel.deleteFournisseur(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }
}

module.exports = FournisseursController;

