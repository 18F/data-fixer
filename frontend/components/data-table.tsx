import React from 'react';

export const DataTable = (props: {
  caption: string;
  table: Array<Array<String>>;
}) => {
  if (props.table.length === 0) {
    return null;
  }
  const [headerRow, ...rows] = props.table;
  return (
    <>
      <table className="usa-table">
        <caption>{props.caption}</caption>
        <thead>
          <tr>
            {headerRow.map((col, index) => (
              <th key={index} scope="col">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
