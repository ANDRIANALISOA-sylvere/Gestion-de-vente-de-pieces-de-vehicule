const db = require('../config/db');

class MarqueModel {
  static getAllMarques(callback) {
    db.query('SELECT * FROM marque', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getMarqueById(id, callback) {
    db.query('SELECT * FROM marque WHERE ID_Marque = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createMarque(marque, callback) {
    db.query('INSERT INTO marque SET ?', marque, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...marque });
      }
    });
  }

  static updateMarque(id, marque, callback) {
    db.query('UPDATE marque SET ? WHERE ID_Marque = ?', [marque, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...marque });
      }
    });
  }

  static deleteMarque(id, callback) {
    db.query('DELETE FROM marque WHERE ID_Marque = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = MarqueModel;