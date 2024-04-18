
const SortieModel = require('../Models/SortieModel');

class SortieController {
  static getAllSortie(req, res) {
    SortieModel.getAllSortie((err, sortie) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(sortie);
      }
    });
  }

  static getSortieById(req, res) {
    SortieModel.getSortieById(req.params.id, (err, sortie) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!sortie) {
        res.json({ message: 'Sortie introuvable.' });
      } else {
        res.json(sortie);
      }
    });
  }

  static createSortie(req, res) {
    SortieModel.createSortie(req.body, (err, sortie) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(sortie);
      }
    });
  }

  static updateSortie(req, res) {
    SortieModel.updateSortie(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deleteSortie(req, res) {
    SortieModel.deleteSortie(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }
}

module.exports = SortieController;

