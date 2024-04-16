const express = require('express');
const ClientsController = require('../Controllers/ClientsController');

const router = express.Router();

router.get('/client', ClientsController.getAllClient);
router.get('/client/:id', ClientsController.getClientsById);
router.post('/client', ClientsController.createClient);
router.put('/client/:id', ClientsController.updateClient);
router.delete('/client/:id', ClientsController.deleteClient);
module.exports = router;