// components/TableFournisseur.js
import React from 'react';
import { Table } from 'reactstrap';
import '../assets/css/table.css';
import TableHead from './Table/TableHead';
import TableBody from './Table/TableBody';

const TableFournisseur = ({ filteredLibraries, onRowSelect, onRowDeselect, selectedRow }) => {
  const columns = ['ID_Fournisseur', 'Nom', 'Adresse', 'Tel'];
  const col =['Identifiant', 'Nom', 'Adresse', 'N° Téléphone']

  return (
    <div className="mb-5">
      <Table striped borderless hover>
        <TableHead columns={col} />
        <TableBody
          data={filteredLibraries}
          columns={columns}
          onRowSelect={onRowSelect}
          onRowDeselect={onRowDeselect}
          selectedRow={selectedRow}
        />
      </Table>
    </div>
  );
};

export default TableFournisseur;