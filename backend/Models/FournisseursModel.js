const db = require('../config/db');

class FournisseursModel {
  static getAllFournisseurs(callback) {
    db.query('SELECT * FROM fournisseurs', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getFournisseurById(id, callback) {
    db.query('SELECT * FROM fournisseurs WHERE ID_Fournisseur = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createFournisseurs(fournisseur, callback) {
    db.query('INSERT INTO fournisseurs SET ?', fournisseur, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...fournisseur });
      }
    });
  }

  static updateFournisseur(id, fournisseur, callback) {
    db.query('UPDATE fournisseurs SET ? WHERE ID_Fournisseur = ?', [fournisseur, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...fournisseur });
      }
    });
  }

  static deleteFournisseur(id, callback) {
    db.query('DELETE FROM fournisseurs WHERE ID_Fournisseur = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = FournisseursModel;