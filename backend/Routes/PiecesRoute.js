const express = require('express');
const PiecesController = require('../Controllers/PiecesController');

const router = express.Router();

router.get('/piece', PiecesController.getAllPiece);
router.get('/piece/:id', PiecesController.getPieceById);
router.post('/piece', PiecesController.createPiece);
router.put('/piece/:id', PiecesController.updatePiece);
router.delete('/piece/:id', PiecesController.deletePiece);
module.exports = router;