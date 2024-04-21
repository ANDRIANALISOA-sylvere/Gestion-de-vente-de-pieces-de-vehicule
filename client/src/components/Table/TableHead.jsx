import React from 'react';

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        <th>#</th>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;