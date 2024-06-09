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

  static countclients(callback)
  {
    db.query("SELECT count(ID_Client) as clients from clients",(err,results)=>{
      if(err)
      {
        callback(err)
      }else
      {
        callback(null,results);
      }
    })
  }

  static meilleurclient(callback)
  {
    db.query("SELECT c.ID_Client,c.Nom,c.adresse,c.Tel,c.email, COUNT(DISTINCT co.ID_Commande) AS nb_commandes FROM clients c INNER JOIN commandes co ON c.ID_Client=co.ID_Client INNER JOIN commande_details cd ON co.ID_Commande=cd.id_commande GROUP BY c.ID_Client ORDER BY SUM(cd.quantite) DESC LIMIT 2",(err,results)=>{
      if(err)
      {
        callback(err)
      }else
      {
        callback(null,results);
      }
    })
  }
}

module.exports = ClientsModel;