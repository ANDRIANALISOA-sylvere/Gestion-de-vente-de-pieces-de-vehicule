const jwt = require("jsonwebtoken");
const UtilisateurModel = require("../Models/UtilisateurModel");

class AuthMiddleware {
  static Auth(req, res, next) {
    try {
      // Récupérer le token depuis les cookies
      const token = req.cookies.auth;

      // Vérifier si le token est présent
      if (!token) {
        return res
          .status(401)
          .json({ message: "Aucun token d'authentification fourni" });
      }

      // Vérifier la validité du token
      const decoded = jwt.verify(token, process.env.SECRET);

      // Récupérer les informations de l'utilisateur à partir de l'ID contenu dans le token
      UtilisateurModel.getUtilisateurById(decoded.sub, (err, utilisateur) => {
        if (err) {
          return res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur",
          });
        }

        if (!utilisateur) {
          return res.status(401).json({ message: "Utilisateur introuvable" });
        }

        // Attacher les informations de l'utilisateur à l'objet de requête
        req.user = utilisateur;
        next();
      });
    } catch (error) {
      // Gérer les erreurs de token invalide ou expiré
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ message: "Token invalide ou expiré" });
      }

      // Gérer les autres erreurs
      console.error("Erreur dans le middleware d'authentification :", error);
      return res
        .status(500)
        .json({ message: "Une erreur inattendue s'est produite" });
    }
  }
}

module.exports = AuthMiddleware;
