// Importation des dépendances nécessaires
import React from "react";

// Composant TableBody
const TableBody = ({
  data,
  columns,
  onRowSelect,
  onRowDeselect,
  selectedRow,
}) => {
  // Fonction pour générer une clé unique pour chaque ligne
  const getRowKey = (item) => {
    return item[columns[0]];
  };

  return (
    <tbody>
      {/* Boucle sur les données pour générer les lignes */}
      {data.map((item) => (
        <tr key={getRowKey(item)}>
          {/* Colonne pour la case à cocher */}
          <td>
            <input
              type="checkbox"
              className="form-check-input"
              checked={
                getRowKey(item) === (selectedRow ? getRowKey(selectedRow) : "")
              }
              onChange={(event) => {
                if (event.target.checked) {
                  // Si la case est cochée, appeler la fonction onRowSelect
                  onRowSelect(item);
                } else {
                  // Sinon, appeler la fonction onRowDeselect
                  onRowDeselect();
                }
              }}
            />
          </td>

          {/* Colonnes pour les données */}
          {columns.map((column) => (
            <td key={`${getRowKey(item)}-${column}`}>{item[column]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
