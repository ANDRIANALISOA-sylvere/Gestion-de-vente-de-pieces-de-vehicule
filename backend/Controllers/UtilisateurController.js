const UtilisateurModel = require("../Models/UtilisateurModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
        UtilisateurModel.generateOTP(req.body.email, (err, otp) => {
          if (err) {
            res.json({ message: err.message });
          } else {
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: req.body.email,
              subject: "Votre Code OTP",
              text: `Votre code OTP est :  ${otp}`,
            };
            console.log(transporter,mailOptions);
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return res.status(500).send("Error sending email " + error.message);
              }
              res.json({ token: utilisateur.token, user: utilisateur.user });
            });
          }
        });
      }
    });
  }

  static verifyOtp(req, res) {
    const { email, otp } = req.body;
    UtilisateurModel.verifyOTP(email, otp, (err, isValid) => {
      if (err) {
        res.json({ message: err.message });
      } else if (!isValid) {
        res.status(401).json({ message: "Invalid OTP" });
      } else {
        res.json({ message: "OTP verified successfully" });
      }
    });
  }

  static logoututilisateur(req, res) {
    res.clearCookie("auth");
    res.json(200);
  }
}

module.exports = UtilisateurController;
