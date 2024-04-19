import { TbBrandAlgolia } from "react-icons/tb";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fond from "../assets/images/bg/bg.avif";
import axios from "axios";
import { Button, Form, FormFeedback, Input, Label } from "reactstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email requis";
    }

    if (!mdp) {
      passwordError = "Mot de passe requis";
    }

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/loginutilisateur/",
          { email, mdp }
        );
        const data = await response.data;
        localStorage.setItem("token", data.token);
        console.log(data.token);
        navigate("/vente");
        setEmailError("");
        setPasswordError("");
      } catch (error) {
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
    <section className="bg-white d-flex align-items-stretch">
      <div className="row flex-grow-1 m-0">
        <div className="col-12 col-lg-6 d-flex align-items-center p-5">
          <div className="w-100">
            <a className="d-block text-primary" href="#">
              <TbBrandAlgolia style={{ fontSize: "50px" }} />
            </a>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              CarParts Central 🚙
            </h1>
            <p className="mt-4 text-gray-500 text-muted">
              {/* Gérez efficacement votre inventaire de pièces automobiles et
              optimisez vos ventes avec notre application intuitive. */}
              Une nouvelle opportunité de briller vous attend. Rendez vos
              clients heureux et atteignez vos objectifs avec passion et
              dévouement !
            </p>
            <Form onSubmit={handleSubmit} className="mt-8">
              <div className="row g-3">
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
                <div className="col-12 col-sm-auto block d-flex justify-content-end">
                  <Button type="submit" className="btn" color="primary">
                    Se connecter
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-12 col-lg-1 h-100 p-0"></div>
        <div className="col-12 col-lg-5 h-100 p-0">
          <img
            alt="Vehicle parts"
            src={Fond}
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </div>
      </div>
    </section>
  );
}
