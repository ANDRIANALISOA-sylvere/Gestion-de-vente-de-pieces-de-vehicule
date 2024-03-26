import { BiReset } from "react-icons/bi"; 
import React from "react";
import { Card } from "../components/Card";

export default function Produits() {
  return (
    <div className="mt-5" style={{ overflow: "hidden" }}>
      <div className="row mt-3">
        <div className="col-md-3 ps-5">
          <div className="card">
            <div className="card-header">Filtrer par :</div>
            <div className="card-body">
              <div>
                <strong>Catégories :</strong>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="firstCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="firstCheckboxStretched"
                    >
                      First checkbox
                    </label>
                  </li>
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="secondCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="secondCheckboxStretched"
                    >
                      Second checkbox
                    </label>
                  </li>
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="thirdCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="thirdCheckboxStretched"
                    >
                      Third checkbox
                    </label>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <strong>Catégories :</strong>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="firstCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="firstCheckboxStretched"
                    >
                      First checkbox
                    </label>
                  </li>
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="secondCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="secondCheckboxStretched"
                    >
                      Second checkbox
                    </label>
                  </li>
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="thirdCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="thirdCheckboxStretched"
                    >
                      Third checkbox
                    </label>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                <strong>Catégories :</strong>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="firstCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="firstCheckboxStretched"
                    >
                      First checkbox
                    </label>
                  </li>
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="secondCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="secondCheckboxStretched"
                    >
                      Second checkbox
                    </label>
                  </li>
                  <li className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={true}
                      id="thirdCheckboxStretched"
                    />
                    <label
                      className="form-check-label stretched-link"
                      htmlFor="thirdCheckboxStretched"
                    >
                      Third checkbox
                    </label>
                  </li>
                </ul>
              </div>
              <div>
                <strong>Prix :</strong>
                <input type="number" className="form-control form-control-sm" placeholder="Entrer le prix"/>
              </div>
              <div className="text-center mt-3">
                <button className="btn btn-danger btn-sm"><BiReset /> Reinitialisé</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
