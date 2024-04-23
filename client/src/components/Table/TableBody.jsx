// Importation des dépendances nécessaires
import React from "react";
import { truncateString } from "../../utils/helper";

// Composant TableBody
const TableBody = ({
  data,
  columns,
  onRowSelect,
  onRowDeselect,
  selectedRow,
  tableName,
  donnepur,
  status,
}) => {
  // Fonction pour générer une clé unique pour chaque ligne
  const getRowKey = (item) => {
    return item[columns[0]];
  };

  // Fonction pour tronquer la valeur de la colonne "Nom" pour la table "pieces"
  const renderCellValue = (column, value) => {
    if (tableName === "pieces" && column === "ID_Categorie") {
      return truncateString(value, 13);
    }
    if (tableName === "pieces" && column === "ID_Fournisseur") {
      return truncateString(value, 13);
    }
    return value;
  };

  console.log(status);

  return (
    <tbody>
      {/* Boucle sur les données pour générer les lignes */}
      {data.map((item) => (
        <tr key={getRowKey(item)}>
          {/* Colonne pour la case à cocher */}
          <td className="text-center">
            <input
              type="checkbox"
              className="form-check-input"
              checked={
                getRowKey(item) === (selectedRow ? getRowKey(selectedRow) : "")
              }
              onChange={(event) => {
                if (event.target.checked) {
                  // Si la case est cochée, appeler la fonction onRowSelect
                  const selectedItem = status
                    ? donnepur.find((donne) => donne.ID_Piece === item.ID_Piece)
                    : item;
                  if (selectedItem) {
                    onRowSelect(selectedItem);
                  }
                } else {
                  // Sinon, appeler la fonction onRowDeselect
                  onRowDeselect();
                }
              }}
            />
          </td>
          {/* Colonnes pour les données */}
          {columns.map((column) => (
            <td key={`${getRowKey(item)}-${column}`} className="text-center">
              {renderCellValue(column, item[column])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
