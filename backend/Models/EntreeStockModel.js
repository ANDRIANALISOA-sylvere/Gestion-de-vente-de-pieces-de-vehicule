const db = require('../config/db');

class EntreeStockModel {
  static getAllEntreeStock(callback) {
    db.query('SELECT * FROM entree_stock', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getEntreeStockById(id, callback) {
    db.query('SELECT * FROM entree_stock WHERE ID_Entree = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createEntreeStock(entree, callback) {
    db.query('INSERT INTO entree_stock SET ?', entree, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...entree });
      }
    });
  }

  static updateEntreeStock(id, entree, callback) {
    db.query('UPDATE entree_stock SET ? WHERE ID_Entree = ?', [entree, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...entree });
      }
    });
  }

  static deleteEntreeStock(id, callback) {
    db.query('DELETE FROM entree_stock WHERE ID_Entree = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = EntreeStockModel;