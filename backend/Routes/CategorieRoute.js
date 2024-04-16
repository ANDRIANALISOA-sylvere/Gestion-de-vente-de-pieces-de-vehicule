const express = require('express');
const CategorieController = require('../Controllers/CatergorieController');

const router = express.Router();

router.get('/categorie', CategorieController.getAllCategorie);
router.get('/categorie/:id', CategorieController.getCategorieById);
router.post('/categorie', CategorieController.createCategorie);
router.put('/categorie/:id', CategorieController.updateCategorie);
router.delete('/categorie/:id', CategorieController.deleteCategorie);

module.exports = router;