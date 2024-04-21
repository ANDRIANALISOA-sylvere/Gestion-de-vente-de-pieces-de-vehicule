import React from 'react';

const TableBody = ({ data, columns, onRowSelect, onRowDeselect, selectedRow }) => {
  const getRowKey = (item) => {
    return item[columns[0]];
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={getRowKey(item)}>
          <td>
            <input
              type="checkbox"
              className="form-check-input"
              checked={getRowKey(item) === (selectedRow ? getRowKey(selectedRow) : '')}
              onChange={(event) => {
                if (event.target.checked) {
                  onRowSelect(item);
                } else {
                  onRowDeselect();
                }
              }}
            />
          </td>
          {columns.map((column) => (
            <td key={`${getRowKey(item)}-${column}`}>{item[column]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;