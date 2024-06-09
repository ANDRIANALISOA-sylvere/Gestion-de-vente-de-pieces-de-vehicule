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

  static getHistorique(req, res) {
    const sql =
      "SELECT c.ID_Commande , c.DateCommande , cl.Nom, cl.adresse , cl.Tel , cl.email FROM commandes c JOIN clients  cl ON c.ID_Client = cl.ID_Client where cl.ID_Client = ? ORDER BY c.DateCommande DESC";
    db.query(sql, req.params.idcli, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }

  static countcommandes(req, res) {
    const sql = "SELECT count(ID_Commande) as commandes from commandes";
    db.query(sql, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }

  static sommequantite(req, res) {
    const sql = "SELECT SUM(quantite) as sommequantite from commande_details";
    db.query(sql, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }

  static recette(req, res) {
    const sql =
      "SELECT SUM(p.Prix_unitaire_ht * (1 + p.TVA) * cd.quantite) as recettes FROM commandes c JOIN commande_details cd ON c.ID_Commande = cd.id_commande JOIN pieces p ON cd.id_produit = p.ID_Piece WHERE MONTH(c.DateCommande)=MONTH(CURRENT_DATE()) AND YEAR (c.DateCommande)=YEAR(CURRENT_DATE())";
    db.query(sql, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }

  static mostpieces(req, res) {
    const sql =
      "SELECT f.Nom FROM fournisseurs f INNER JOIN pieces p ON p.ID_Fournisseur=f.ID_Fournisseur INNER JOIN commande_details cd ON cd.id_produit=p.ID_Piece GROUP BY f.ID_Fournisseur ORDER BY f.Nom ASC LIMIT 7";
    db.query(sql, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }

  static sumquantitefournisseur(req, res) {
    const sql =
      "SELECT f.Nom, SUM(cd.quantite) AS total_vendu FROM fournisseurs f INNER JOIN pieces p ON p.ID_Fournisseur=f.ID_Fournisseur INNER JOIN commande_details cd ON cd.id_produit=p.ID_Piece GROUP BY f.ID_Fournisseur ORDER BY f.Nom ASC  LIMIT 7";
    db.query(sql, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }

  static countclientfournisseur(req, res) {
    const sql =
      "SELECT f.Nom, COUNT(DISTINCT c.ID_Client) AS nb_clients FROM fournisseurs f INNER JOIN pieces p ON p.ID_Fournisseur=f.ID_Fournisseur INNER JOIN commande_details cd ON cd.id_produit=p.ID_Piece INNER JOIN commandes c ON c.ID_Commande=cd.id_commande WHERE f.Nom IN(SELECT f.Nom FROM fournisseurs f INNER JOIN pieces p ON p.ID_Fournisseur=f.ID_Fournisseur INNER JOIN commande_details cd ON cd.id_produit=p.ID_Piece GROUP BY f.ID_Fournisseur ORDER BY SUM(cd.quantite) DESC) GROUP BY f.ID_Fournisseur ORDER BY f.Nom ASC";
    db.query(sql, function (err, result) {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(result);
      }
    });
  }
}

module.exports = TableCommandesController;
