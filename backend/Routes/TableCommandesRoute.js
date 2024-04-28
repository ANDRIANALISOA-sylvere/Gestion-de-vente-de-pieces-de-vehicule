const express = require("express");
const TableCommandesController = require("../Controllers/TableCommandesController");

const router = express.Router();

router.get("/tablecommande", TableCommandesController.getTableCommandes);
router.get(
  "/tablecommande/:id",
  TableCommandesController.getSingleTableCommande
);
router.post("/tablecommande", TableCommandesController.createCommande);

module.exports = router;
