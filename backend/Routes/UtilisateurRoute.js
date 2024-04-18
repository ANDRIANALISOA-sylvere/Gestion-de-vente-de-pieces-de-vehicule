const express = require("express");
const UtilisateurController = require("../Controllers/UtilisateurController");

const router = express.Router();

router.get("/utilisateur", UtilisateurController.getAllUtilisateur);
router.get("/utilisateur/:matricule", UtilisateurController.getUtilisateurById);
router.post("/utilisateur", UtilisateurController.createUtilisateur);
router.post("/loginutilisateur", UtilisateurController.loginUtilisateur);
router.get("/logoututilisateur", UtilisateurController.logoututilisateur);
router.delete(
  "/utilisateur/:matricule",
  UtilisateurController.deleteUtilisateur
);

module.exports = router;
