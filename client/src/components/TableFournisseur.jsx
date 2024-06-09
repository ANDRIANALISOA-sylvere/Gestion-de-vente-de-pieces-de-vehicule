// Importation des dépendances nécessaires
import React from "react";
import { Table } from "reactstrap";
import "../assets/css/table.css";
import TableHead from "./Table/TableHead";
import TableBody from "./Table/TableBody";

// Composant TableFournisseur
const TableFournisseur = ({
  filteredLibraries,
  onRowSelect,
  onRowDeselect,
  selectedRow,
}) => {
  // Tableau des noms de colonnes pour les données
  const columns = ["ID_Fournisseur", "Nom", "Adresse", "Tel"];

  // Tableau des noms de colonnes à afficher
  const col = ["Identifiant", "Nom", "Adresse", "N° Téléphone"];

  return (
    <div className="mb-2">
      {/* Utilisation du composant Table de reactstrap */}
      <Table striped borderless hover>
        {/* En-tête du tableau */}
        <TableHead columns={col} />

        {/* Corps du tableau */}
        {filteredLibraries && (
          <TableBody
            data={filteredLibraries}
            columns={columns}
            onRowSelect={onRowSelect}
            onRowDeselect={onRowDeselect}
            selectedRow={selectedRow}
          />
        )}
      </Table>
    </div>
  );
};

export default TableFournisseur;
