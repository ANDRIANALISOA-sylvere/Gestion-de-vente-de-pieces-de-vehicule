
const EntreeStockModel = require('../Models/EntreeStockModel');

class EntreeStockController {
  static getAllEntree(req, res) {
    EntreeStockModel.getAllEntreeStock((err, entree) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(entree);
      }
    });
  }

  static getEntreeById(req, res) {
    EntreeStockModel.getEntreeStockById(req.params.id, (err, entree) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!entree) {
        res.json({ message: 'Entrée introuvable.' });
      } else {
        res.json(entree);
      }
    });
  }

  static createEntree(req, res) {
    EntreeStockModel.createEntreeStock(req.body, (err, entree) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(entree);
      }
    });
  }

  static updateEntree(req, res) {
    EntreeStockModel.updateEntreeStock(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deleteEntree(req, res) {
    EntreeStockModel.deleteEntreeStock(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }
}

module.exports = EntreeStockController;

