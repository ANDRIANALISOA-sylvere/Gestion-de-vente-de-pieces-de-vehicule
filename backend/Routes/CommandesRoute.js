const express = require('express');
const CommandesController = require('../Controllers/CommandesController');

const router = express.Router();

router.get('/commande', CommandesController.getAllCommandes);
router.get('/commande/:id', CommandesController.getCommandeById);
router.post('/commande', CommandesController.createCommande);
router.put('/commande/:id', CommandesController.updateCommande);
router.delete('/commande/:id', CommandesController.deleteCommande);
module.exports = router;