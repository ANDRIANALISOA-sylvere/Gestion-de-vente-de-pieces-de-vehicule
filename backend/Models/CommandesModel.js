const db = require('../config/db');

class CommandesModel {
  static getAllCommandes(callback) {
    db.query('SELECT * FROM commandes', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getCommandeById(id, callback) {
    db.query('SELECT * FROM commandes WHERE ID_Commande = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createCommande(commande, callback) {
    db.query('INSERT INTO commandes SET ?', commande, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...commande });
      }
    });
  }

  static updateCommande(id, commande, callback) {
    db.query('UPDATE commandes SET ? WHERE ID_Commande = ?', [commande, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...commande });
      }
    });
  }

  static deleteCommande(id, callback) {
    db.query('DELETE FROM commandes WHERE ID_Commande = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = CommandesModel;