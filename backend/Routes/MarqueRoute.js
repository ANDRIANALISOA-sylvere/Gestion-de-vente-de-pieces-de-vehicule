const express = require('express');
const MarqueController = require('../Controllers/MarqueController');

const router = express.Router();

router.get('/marque', MarqueController.getAllMarque);
router.get('/marque/:id', MarqueController.getMarqueById);
router.post('/marque', MarqueController.createMarque);
router.put('/marque/:id', MarqueController.updateMarque);
router.delete('/marque/:id', MarqueController.deleteMarque);
module.exports = router;