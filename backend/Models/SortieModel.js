const db = require('../config/db');

class SortieModel {
  static getAllSortie(callback) {
    db.query('SELECT * FROM sortie_stock', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getSortieById(id, callback) {
    db.query('SELECT * FROM sortie_stock WHERE ID_Sortie = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createSortie(sortie, callback) {
    db.query('INSERT INTO sortie_stock SET ?', sortie, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...sortie });
      }
    });
  }

  static updateSortie(id, sortie, callback) {
    db.query('UPDATE sortie_stock SET ? WHERE ID_Sortie = ?', [sortie, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...sortie });
      }
    });
  }

  static deleteSortie(id, callback) {
    db.query('DELETE FROM sortie_stock WHERE ID_Sortie = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = SortieModel;