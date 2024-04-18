const db = require('../config/db');

class PiecesModel {
  static getAllPieces(callback) {
    db.query('SELECT * FROM pieces', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getPieceById(id, callback) {
    db.query('SELECT * FROM pieces WHERE ID_Piece = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createPieces(piece, callback) {
    db.query('INSERT INTO pieces SET ?', piece, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...piece });
      }
    });
  }

  static updatePiece(id, piece, callback) {
    db.query('UPDATE pieces SET ? WHERE ID_Piece = ?', [piece, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...piece });
      }
    });
  }

  static deletePiece(id, callback) {
    db.query('DELETE FROM pieces WHERE ID_Piece = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = PiecesModel;