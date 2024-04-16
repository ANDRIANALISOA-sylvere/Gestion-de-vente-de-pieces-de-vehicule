
const ClientsModel = require('../Models/ClientsModel');

class ClientsController {
  static getAllClient(req, res) {
    ClientsModel.getAllClients((err, client) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(client);
      }
    });
  }

  static getClientsById(req, res) {
    ClientsModel.getClientById(req.params.id, (err, client) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!client) {
        res.json({ message: 'Client introuvable.' });
      } else {
        res.json(client);
      }
    });
  }

  static createClient(req, res) {
    ClientsModel.createClients(req.body, (err, client) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(client);
      }
    });
  }

  static updateClient(req, res) {
    ClientsModel.updateClient(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deleteClient(req, res) {
    ClientsModel.deleteClient(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }
}

module.exports = ClientsController;

