const db = require('../config/db');

class ClientsModel {
  static getAllClients(callback) {
    db.query('SELECT * FROM clients', (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getClientById(id, callback) {
    db.query('SELECT * FROM clients WHERE ID_Client = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static createClients(client, callback) {
    db.query('INSERT INTO clients SET ?', client, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { ...client });
      }
    });
  }

  static updateClient(id, client, callback) {
    db.query('UPDATE clients SET ? WHERE ID_Client = ?', [client, id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, ...client });
      }
    });
  }

  static deleteClient(id, callback) {
    db.query('DELETE FROM clients WHERE ID_Client = ?', [id], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { id });
      }
    });
  }
}

module.exports = ClientsModel;