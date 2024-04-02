import { HiXCircle } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import React from "react";
import Sary from "../assets/Images/font.jpeg";

export default function Panier() {
  return (
    <div className="row m-5">
      <div className="col-md-8">
        <h3 style={{ fontWeight: "bold" }}>
          Votre panier <small>(1 produit)</small>
        </h3>
        <hr style={{ opacity: "0.1" }} />
        <div className="row mt-3 panier p-3 border border-dark">
          <div className="col-md-3">
            <img src={Sary} alt="" style={{ width: "100%" }} />
          </div>
          <div className="col-md-6">
            <h4>Lenovo L540</h4>
            <span className="badge bg-info-subtle text-info-emphasis rounded-pill">
              PC portable
            </span>
            <p className="mt-3">
              <small className="text-success">
                <AiOutlineCheckCircle /> En stock
              </small>
            </p>
          </div>
          <div className="col-md-3">
            <h2 className="text-success">$ 100</h2>
            <div className="form-group">
              <label htmlFor="quantite">Quantité</label>
              <select
                name="quantite"
                id="quantite"
                className="form-select"
                style={{ width: "100px" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <button className="btn btn-danger btn-sm mt-4 d-flex gap-2 align-items-center">
                <HiXCircle /> Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3 ms-1">
        <h5>Recapitulatif</h5>
        <div className="mt-3">
          <span>Panier (2)</span>
          <hr style={{ opacity: "0.1" }} />
          <div className="d-flex justify-content-between mt-3">
            <span>Lenovo L540</span>
            <span>$100</span>
          </div>
          <hr style={{ opacity: "0.1" }} />
          <div className="d-flex justify-content-between mt-3">
            <h3>TOTAL</h3>
            <h4 className="text-danger">$100</h4>
          </div>
          <div>
            <button className="btn btn-warning btn-sm w-100 mt-3">
              Choisir ma livraison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
