const UtilisateurModel = require("../Models/UtilisateurModel");

class UtilisateurController {
  static getAllUtilisateur(req, res) {
    UtilisateurModel.getAllUtilisateur((err, utilisateur) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.status(200).json(utilisateur);
      }
    });
  }

  static getUtilisateurById(req, res) {
    UtilisateurModel.getUtilisateurById(
      req.params.matricule,
      (err, utilisateur) => {
        if (err) {
          res.json({ message: err.message });
        } else if (!utilisateur) {
          res.json({ message: "Utilisateur introuvable." });
        } else {
          res.json(utilisateur);
        }
      }
    );
  }

  static createUtilisateur(req, res) {
    UtilisateurModel.createUtilisateur(req.body, (err, utilisateur) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(utilisateur);
      }
    });
  }

  static deleteUtilisateur(req, res) {
    UtilisateurModel.deleteUtilisateur(req.params.matricule, (err) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Suppression avec succès." });
      }
    });
  }

  static loginUtilisateur(req, res) {
    UtilisateurModel.loginUtilisateur(req.body, (err, utilisateur, message) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!utilisateur) {
        res.status(401).json({ message });
      } else {
        console.log(utilisateur.exp);
        res.cookie("auth", utilisateur.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        res.json({token : utilisateur.token});
      }
    });
  }

  static logoututilisateur(req,res){
    res.clearCookie('auth')
    res.json(200)
  }

}

module.exports = UtilisateurController;
