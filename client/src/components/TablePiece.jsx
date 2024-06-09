// Importation des dépendances nécessaires
import React from "react";
import { Table } from "reactstrap";
import "../assets/css/table.css";
import TableHead from "./Table/TableHead";
import TableBody from "./Table/TableBody";

// Composant TablePiece
const TablePiece = ({
  filteredLibraries,
  onRowSelect,
  onRowDeselect,
  selectedRow,
  donnepur,
  status
}) => {
  // Tableau des noms de colonnes pour les données
  const columns = [
    "ID_Piece",
    "Nom",
    "Prix_unitaire_ht",
    "ID_Categorie",
    "ID_marque",
    "Stock_disponible",
    "ID_Fournisseur",
    "TVA",
  ];

  // Tableau des noms de colonnes à afficher
  const col = [
    "Identifiant",
    "Nom",
    "Prix Unitaire",
    "Catégorie",
    "Marque",
    "Stock disponible",
    "Fournisseur",
    "TVA",
  ];

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
            tableName="pieces"
            donnepur={donnepur}
            status={status}
          />
        )}
      </Table>
    </div>
  );
};

export default TablePiece;
