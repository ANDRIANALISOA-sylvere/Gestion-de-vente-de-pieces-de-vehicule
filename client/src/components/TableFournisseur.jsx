import React from "react";
import { Table } from "reactstrap";
import "../assets/css/table.css";

function TableFournisseur({ filteredLibraries, onRowSelect, onRowDeselect, selectedRow }) {
  return (
    <div className="mb-5">
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Identifiant</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>N° Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {filteredLibraries.map((fournisseur) => {
            return (
              <tr key={fournisseur.ID_Fournisseur}>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="fournisseur-select"
                    checked={
                      fournisseur.ID_Fournisseur ===
                      (selectedRow?.ID_Fournisseur || "")
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        onRowSelect(fournisseur);
                      } else {
                        onRowDeselect();
                      }
                    }}
                  />
                </td>
                <td>{fournisseur.ID_Fournisseur}</td>
                <td>{fournisseur.Nom}</td>
                <td>{fournisseur.Adresse}</td>
                <td>{fournisseur.Tel}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TableFournisseur;
