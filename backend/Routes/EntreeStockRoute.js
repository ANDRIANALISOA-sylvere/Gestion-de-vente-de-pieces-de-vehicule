const express = require('express');
const EntreeStockController = require('../Controllers/EntreeStockController');

const router = express.Router();

router.get('/entree', EntreeStockController.getAllEntree);
router.get('/entree/:id', EntreeStockController.getEntreeById);
router.post('/entree', EntreeStockController.createEntree);
router.put('/entree/:id', EntreeStockController.updateEntree);
router.delete('/entree/:id', EntreeStockController.deleteEntree);
module.exports = router;