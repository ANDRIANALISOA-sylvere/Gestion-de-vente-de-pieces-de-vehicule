// Importation des dépendances nécessaires
import React from "react";

// Composant TableHead
const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {/* Cellule d'en-tête pour le numéro de ligne */}
        <th>#</th>

        {/* Boucle sur les colonnes pour générer les cellules d'en-tête */}
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
