const db = require('../config/db');

class CategorieModel {
  static getAllCategories(callback) {
    db.query('SELECT * FROM categorie', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getCategorieById(id, callback) {
    db.query('SELECT * FROM categorie WHERE ID_Categorie = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createCategorie(categorie, callback) {
    db.query('INSERT INTO categorie SET ?', categorie, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...categorie });
      }
    });
  }

  static updateCategorie(id, categorie, callback) {
    db.query('UPDATE categorie SET ? WHERE ID_Categorie = ?', [categorie, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...categorie });
      }
    });
  }

  static deleteCategorie(id, callback) {
    db.query('DELETE FROM categorie WHERE ID_categorie = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = CategorieModel;