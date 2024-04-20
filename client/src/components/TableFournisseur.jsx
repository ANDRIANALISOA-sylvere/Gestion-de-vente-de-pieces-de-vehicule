import React from "react";

function TableFournisseur({ data, onRowSelect, onRowDeselect, selectedRow }) {
  return (
    <div className="mydiv mb-5">
      <table className="mytable">
        <thead className="thead">
          <tr>
            <th scope="col" className="th">
              #
            </th>
            <th scope="col" className="th">
              Identifiant
            </th>
            <th scope="col" className="th">
              Nom
            </th>
            <th scope="col" className="th">
              Adresse
            </th>
            <th scope="col" className="th">
              N° Téléphone
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((fournisseur) => {
            return (
              <tr className="tr" key={fournisseur.ID_Fournisseur}>
                <td className="td">
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
                <td className="td">{fournisseur.ID_Fournisseur}</td>
                <td className="td">{fournisseur.Nom}</td>
                <td className="td">{fournisseur.Adresse}</td>
                <td className="td">{fournisseur.Tel}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableFournisseur;
