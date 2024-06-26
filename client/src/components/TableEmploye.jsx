// Importation des dépendances nécessaires
import React from "react";
import { Table } from "reactstrap";
import "../assets/css/table.css";
import TableHead from "./Table/TableHead";
import TableBody from "./Table/TableBody";

// Composant TableEmploye
const TableEmploye = ({
  filteredLibraries,
  onRowSelect,
  onRowDeselect,
  selectedRow,
}) => {
  // Tableau des noms de colonnes pour les données
  const columns = ["matricule", "nom", "prenom", "email", "role"];

  // Tableau des noms de colonnes à afficher
  const col = ["N° Matricule", "Nom", "Prenom", "Adresse Email", "Rôle"];

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

export default TableEmploye;
