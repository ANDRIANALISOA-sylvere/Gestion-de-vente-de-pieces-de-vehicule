const express = require("express");
const TableCommandesController = require("../Controllers/TableCommandesController");

const router = express.Router();

router.get("/tablecommande", TableCommandesController.getTableCommandes);
router.get("/countcommande", TableCommandesController.countcommandes);
router.get("/sommequantite", TableCommandesController.sommequantite);
router.get("/recettes", TableCommandesController.recette);
router.get("/mostpieces", TableCommandesController.mostpieces);
router.get(
  "/sumquantitefournisseur",
  TableCommandesController.sumquantitefournisseur
);
router.get(
  "/countclientfournisseur",
  TableCommandesController.countclientfournisseur
);
router.get(
  "/tablecommande/commande/:idcli",
  TableCommandesController.getHistorique
);
router.get(
  "/tablecommande/:id",
  TableCommandesController.getSingleTableCommande
);
router.post("/tablecommande", TableCommandesController.createCommande);

module.exports = router;
