
const CommandesModel = require('../Models/CommandesModel');

class CommandesController {
  static getAllCommandes(req, res) {
    CommandesModel.getAllCommandes((err, commande) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(commande);
      }
    });
  }

  static getCommandeById(req, res) {
    CommandesModel.getCommandeById(req.params.id, (err, commande) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!commande) {
        res.json({ message: 'Commande introuvable.' });
      } else {
        res.json(commande);
      }
    });
  }

  static createCommande(req, res) {
    CommandesModel.createCommande(req.body, (err, commande) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(commande);
      }
    });
  }

  static updateCommande(req, res) {
    CommandesModel.updateCommande(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deleteCommande(req, res) {
    CommandesModel.deleteCommande(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }
}

module.exports = CommandesController;

