const express = require('express');
const FournisseurController = require('../Controllers/FournisseursControlleur');

const router = express.Router();

router.get('/fournisseur', FournisseurController.getAllFournisseur);
router.get('/fournisseur/:id', FournisseurController.getFournisseurById);
router.post('/fournisseur', FournisseurController.createFournisseur);
router.put('/fournisseur/:id', FournisseurController.updateFournisseur);
router.delete('/fournisseur/:id', FournisseurController.deleteFournisseur);
module.exports = router;