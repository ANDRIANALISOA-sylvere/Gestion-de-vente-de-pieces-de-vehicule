import React from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="p-3 mt-5 login_body">
        <section className="header_login">
          <p className="text-center brand_login">E-vendre</p>
          <p className="text-muted">Lorem ipsum dolor sit amet consectetur Lorem</p>
        </section>
        <section className="section_body_login mt-4">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Entrer votre email"
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                placeholder="Entrer votre mot de passe"
              />
            </div>
            <div className="mb-5">
              <NavLink style={{ float: "right" }}>
                Mot de passe oublié ?
              </NavLink>
            </div>
            <div className="form-group mt-2">
              <button
                className="btn btn-warning w-100"
                style={{ float: "right" }}
              >
                connexion
              </button>
            </div>
          </form>
        </section>
        <br />
        <section className="section_footer_login mt-5 text-center">
          <p className="text-muted">&copy;copyright 2024, E-vendre</p>
        </section>
      </div>
    </div>
  );
}
