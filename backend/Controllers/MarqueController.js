
const MarqueModel = require('../Models/MarqueModel');

class MarqueController {
  static getAllMarque(req, res) {
    MarqueModel.getAllMarques((err, marque) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(marque);
      }
    });
  }

  static getMarqueById(req, res) {
    MarqueModel.getMarqueById(req.params.id, (err, marque) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!marque) {
        res.json({ message: 'Marque introuvable.' });
      } else {
        res.json(marque);
      }
    });
  }

  static createMarque(req, res) {
    MarqueModel.createMarque(req.body, (err, marque) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(marque);
      }
    });
  }

  static updateMarque(req, res) {
    MarqueModel.updateMarque(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deleteMarque(req, res) {
    MarqueModel.deleteMarque(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }
}

module.exports = MarqueController;

