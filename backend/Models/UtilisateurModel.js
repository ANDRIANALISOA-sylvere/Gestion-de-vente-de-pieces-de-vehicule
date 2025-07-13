const db = require("../config/db");
const bcrypt = require("bcryptjs");
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
          callback(null, false, { email: "Votre email est incorrecte" });
        } else {
          bcrypt.compare(mdp, result[0].mdp, (err, isMatch) => {
            if (err) {
              callback(err);
            } else if (isMatch === false) {
              callback(null, false, {
                mdp: "Votre mot de passe est incorrecte",
              });
            } else {
              const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
              const token = jwt.sign(
                { sub: result[0].matricule, exp },
                process.env.SECRET
              );
              const user = result[0];
              callback(null, { token, user });
            }
          });
        }
      }
    );
  }

  static generateOTP(email, callback) {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    db.query(
      "UPDATE utilisateur SET otp = ? WHERE email = ?",
      [otp, email],
      (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, otp);
        }
      }
    );
  }

  static verifyOTP(email, otp, callback) {
    db.query(
      "SELECT * FROM utilisateur WHERE email = ? AND otp = ?",
      [email, otp],
      (err, results) => {
        if (err) {
          callback(err);
        } else if (results.length === 0) {
          callback(null, false);
        } else {
          db.query(
            "UPDATE utilisateur SET otp = NULL WHERE email = ?",
            [email],
            (err) => {
              if (err) {
                callback(err);
              } else {
                callback(null, true);
              }
            }
          );
        }
      }
    );
  }
}

module.exports = UtilisateurModel;
