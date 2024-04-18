const jwt = require("jsonwebtoken");
const UtilisateurModel = require("../Models/UtilisateurModel");

class AuthMiddleware {
  static Auth(req, res, next) {
    try {
      const token = req.cookies.auth;
      const decoded = jwt.verify(token, process.env.SECRET);
      UtilisateurModel.getUtilisateurById(decoded.sub, (err, utilisateur) => {
        if (err) {
          res.json({ message: err.message });
        } else if (!utilisateur) {
          res.json({ message: "Utilisateur introuvable." });
        } else {
            req.user = utilisateur;
            next();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthMiddleware;
