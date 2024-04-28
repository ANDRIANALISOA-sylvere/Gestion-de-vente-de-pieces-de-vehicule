const db = require("../config/db");

const getQuantiteDisponible = (ID_Piece) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT Stock_disponible FROM pieces WHERE ID_Piece = ?";
    db.query(query, [ID_Piece], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].Stock_disponible);
      }
    });
  });
};

const reduction = (ID_Piece, quantite) => {
  return new Promise((resolve, reject) => {
    const query =
      "update pieces set Stock_disponible=Stock_disponible-? WHERE ID_Piece = ?";
    db.query(query, [quantite, ID_Piece], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

class TableCommandesController {
  static async createCommande(req, res) {
    const { ID_Commande, ID_Client, DateCommande, produits } = req.body;

    try {
      // Vérifier si la quantité est disponible pour chaque produit
      for (const { id_produit, quantite } of produits) {
        const quantiteDisponible = await getQuantiteDisponible(id_produit);
        if (quantite > quantiteDisponible) {
          return res.json({
            message: `Quantité insuffisante`,
            status: "manquante",
          });
        }
      }

      // Insérer la commande
      const queryCommande =
        "INSERT INTO commandes (ID_Commande, ID_Client, DateCommande) VALUES (?, ?, ?)";
      const valuesCommande = [ID_Commande, ID_Client, DateCommande];
      await db.query(queryCommande, valuesCommande);

      // Insérer les détails de la commande
      const detailsQueries = produits.map(({ id_produit, quantite }) => {
        const queryDetails =
          "INSERT INTO commande_details (id_commande, id_produit, quantite) VALUES (?, ?, ?)";
        const valuesDetails = [ID_Commande, id_produit, quantite];
        return db.query(queryDetails, valuesDetails);
      });

      for (const { id_produit, quantite } of produits) {
        await reduction(id_produit, quantite);
      }

      await Promise.all(detailsQueries);

      res.json({ message: "Commande enregistrée avec succès", status: "ok" });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  static getTableCommandes(req, res) {
    const sql = "SELECT * FROM commandes";
    db.query(sql, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }

  static getSingleTableCommande(req, res) {
    const sql = "SELECT * FROM commande_details where id_commande=?";
    db.query(sql, req.params.id, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = TableCommandesController;
