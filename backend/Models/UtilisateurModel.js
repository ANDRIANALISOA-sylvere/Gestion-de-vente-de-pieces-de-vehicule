const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class UtilisateurModel {
  static getAllUtilisateur(callback) {
    db.query("SELECT * FROM utilisateur", (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }

  static getUtilisateurById(id, callback) {
    db.query(
      "SELECT * FROM utilisateur WHERE matricule = ?",
      [id],
      (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, results[0]);
        }
      }
    );
  }

  static createUtilisateur(utilisateur, callback) {
    const { matricule, nom, prenom, email, mdp, role } = utilisateur;
    const salt = bcrypt.genSaltSync(10);
    const hashedMdp = bcrypt.hashSync(mdp, salt);
    db.query(
      "INSERT INTO utilisateur SET matricule=?, nom=?, prenom=?, email=?, mdp=?, role=?",
      [matricule, nom, prenom, email, hashedMdp, role],
      (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { ...utilisateur });
        }
      }
    );
  }

  static deleteUtilisateur(id, callback) {
    db.query(
      "DELETE FROM utilisateur WHERE matricule = ?",
      [id],
      (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { id });
        }
      }
    );
  }

  static loginUtilisateur(utilisateur, callback) {
    const { email, mdp } = utilisateur;
    db.query(
      "SELECT * FROM utilisateur where email=?",
      [email],
      (err, result) => {
        if (err) {
          callback(err);
        } else if (result.length === 0) {
          callback(null, false, "Email incorrecte");
        } else {
          bcrypt.compare(mdp, result[0].mdp, (err, isMatch) => {
            if (err) {
              callback(err);
            } else if (isMatch === false) {
              callback(null, false, "Mot de passe incorrecte");
            } else {
              const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
              const token = jwt.sign(
                { sub: result[0].matricule, exp },
                process.env.SECRET
              );
              callback(null, {token ,exp});
            }
          });
        }
      }
    );
  }

}

module.exports = UtilisateurModel;
