import React, { useState } from "react";
import { TbBrandAlgolia } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, FormFeedback, Input, Label } from "reactstrap";
import axios from "axios";
import Fond from "../assets/images/bg/roberto-nickson-Yp9FdEqaCdk-unsplash.jpg";
import Loader from "../layouts/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [otp, setOtp] = useState(""); // État pour l'OTP
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

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
        localStorage.setItem("user", JSON.stringify(data.user));
        setStep(2);
        setEmailError("");
        setPasswordError("");
      } catch (error) {
        const errorMessage = error.response.data.message;

        if (errorMessage.email) {
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

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setOtpError("OTP requis");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/verify-otp", {
          email,
          otp,
        });
        const data = await response.data;
        setShowLoader(true);
        setTimeout(() => {
          navigate("/vente");
        }, 1000);
        setOtpError("");
      } catch (error) {
        setOtpError("OTP invalide");
      }
    }
  };

  return (
    <div>
      {showLoader && <Loader />}
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
                Une nouvelle opportunité de briller vous attend. Rendez vos
                clients heureux et atteignez vos objectifs avec passion et
                dévouement !
              </p>
              {step === 1 && (
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
                      {emailError && <FormFeedback>{emailError}</FormFeedback>}
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
                      {passwordError && (
                        <FormFeedback>{passwordError}</FormFeedback>
                      )}
                    </div>
                    <div className="col-12 col-sm-auto block d-flex justify-content-end">
                      <Button type="submit" className="btn" color="primary">
                        Se connecter
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
              {step === 2 && (
                <Form onSubmit={handleOtpSubmit} className="mt-8">
                  <Alert color="success">
                    Un code de vérification à usage unique (OTP) a été envoyé à
                    votre adresse e-mail. Veuillez copier ce code et le coller
                    dans le champ ci-dessous pour vous connecter.
                  </Alert>
                  <div className="row g-3">
                    <div className="col-12">
                      <Label htmlFor="OTP" className="form-label">
                        Code OTP
                      </Label>
                      <Input
                        type="text"
                        id="OTP"
                        name="otp"
                        className={`form-control ${
                          otpError ? "is-invalid input-error" : ""
                        }`}
                        placeholder="Entrer votre code OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      {otpError && <FormFeedback>{otpError}</FormFeedback>}
                    </div>
                    <div className="col-12 col-sm-auto block d-flex justify-content-end">
                      <Button type="submit" className="btn" color="primary">
                        Vérifier OTP
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
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
    </div>
  );
};

export default Login;
