const express = require('express');
const SortieController = require('../Controllers/SortieController');

const router = express.Router();

router.get('/sortie', SortieController.getAllSortie);
router.get('/sortie/:id', SortieController.getSortieById);
router.post('/sortie', SortieController.createSortie);
router.put('/sortie/:id', SortieController.updateSortie);
router.delete('/sortie/:id', SortieController.deleteSortie);
module.exports = router;