
const PiecesModel = require('../Models/PiecesModel');

class PiecesController {
  static getAllPiece(req, res) {
    PiecesModel.getAllPieces((err, piece) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(piece);
      }
    });
  }

  static getPieceById(req, res) {
    PiecesModel.getPieceById(req.params.id, (err, piece) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!piece) {
        res.json({ message: 'Pièce introuvable.' });
      } else {
        res.json(piece);
      }
    });
  }

  static createPiece(req, res) {
    PiecesModel.createPieces(req.body, (err, piece) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(piece);
      }
    });
  }

  static updatePiece(req, res) {
    PiecesModel.updatePiece(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Modification avec succès" });
      }
    });
  }

  static deletePiece(req, res) {
    PiecesModel.deletePiece(req.params.id, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }

  static countpiece(req,res)
  {
    PiecesModel.countpiece((err,piece)=>{
      if(err)
      {
        res.json({message : err.message})
      }else
      {
        res.json(piece);
      }
    })
  }
}

module.exports = PiecesController;

