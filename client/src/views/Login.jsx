// Importations des dépendances
import React, { useContext, useState } from "react";
import { TbBrandAlgolia } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormFeedback, Input, Label } from "reactstrap";
import axios from "axios";

// Importation de l'image de fond
import Fond from "../assets/images/bg/bg.avif";
import Loader from "../layouts/loader/Loader";

const Login = () => {
  // État local pour stocker l'email, le mot de passe et les erreurs
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  // Hook pour la navigation
  const navigate = useNavigate();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";

    // Validation des champs
    if (!email) {
      emailError = "Email requis";
    }

    if (!mdp) {
      passwordError = "Mot de passe requis";
    }

    // Vérification des erreurs
    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
    } else {
      try {
        // Appel à l'API pour l'authentification
        const response = await axios.post(
          "http://localhost:5000/loginutilisateur/",
          { email, mdp }
        );
        const data = await response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setShowLoader(true);
        setTimeout(() => {
          navigate("/vente");
        }, 1000);

        setEmailError("");
        setPasswordError("");
        setEmailError("");
        setPasswordError("");
      } catch (error) {
        // Gestion des erreurs de l'API
        const errorMessage = error.response.data.message;

        if (errorMessage.email) {
          console.log(errorMessage.email);
          setEmailError(errorMessage.email);
        } else {
          setEmailError("");
        }

        if (errorMessage.mdp) {
          setPasswordError(errorMessage.mdp);
        } else {
          setPasswordError("");
        }
      }
    }
  };

  return (
    <div>
      {showLoader && <Loader />}

      <section className="bg-white d-flex align-items-stretch">
        <div className="row flex-grow-1 m-0">
          {/* Colonne de gauche avec le formulaire de connexion */}
          <div className="col-12 col-lg-6 d-flex align-items-center p-5">
            <div className="w-100">
              <a className="d-block text-primary" href="#">
                <TbBrandAlgolia style={{ fontSize: "50px" }} />
              </a>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                CarParts Central 🚙
              </h1>
              <p className="mt-4 text-gray-500 text-muted">
                Une nouvelle opportunité de briller vous attend. Rendez vos
                clients heureux et atteignez vos objectifs avec passion et
                dévouement !
              </p>
              <Form onSubmit={handleSubmit} className="mt-8">
                <div className="row g-3">
                  {/* Champ de saisie de l'email */}
                  <div className="col-12">
                    <Label htmlFor="Email" className="form-label">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="Email"
                      name="email"
                      className={`form-control ${
                        emailError ? "is-invalid input-error" : ""
                      }`}
                      placeholder="Entrer votre email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {emailError && typeof emailError === "string" && (
                      <FormFeedback>{emailError}</FormFeedback>
                    )}
                    {emailError && typeof emailError === "object" && (
                      <FormFeedback>
                        {Object.values(emailError).join(", ")}
                      </FormFeedback>
                    )}
                  </div>

                  {/* Champ de saisie du mot de passe */}
                  <div className="col-12">
                    <Label htmlFor="Password" className="form-label">
                      Mot de passe
                    </Label>
                    <Input
                      type="password"
                      id="Password"
                      name="password"
                      className={`form-control ${
                        passwordError ? "input-error is-invalid" : ""
                      }`}
                      placeholder="Entrer votre mot de passe"
                      value={mdp}
                      onChange={(e) => setMdp(e.target.value)}
                    />

                    {passwordError && typeof passwordError === "string" && (
                      <FormFeedback>{passwordError}</FormFeedback>
                    )}
                    {passwordError && typeof passwordError === "object" && (
                      <FormFeedback>
                        {Object.values(passwordError).join(", ")}
                      </FormFeedback>
                    )}
                  </div>

                  {/* Bouton de soumission du formulaire */}
                  <div className="col-12 col-sm-auto block d-flex justify-content-end">
                    <Button type="submit" className="btn" color="primary">
                      Se connecter
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>

          {/* Colonne vide */}
          <div className="col-12 col-lg-1 h-100 p-0"></div>

          {/* Colonne de droite avec l'image de fond */}
          <div className="col-12 col-lg-5 h-100 p-0">
            <img
              alt="Vehicle parts"
              src={Fond}
              className="img-fluid h-100 w-100 object-fit-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
