import React from 'react';

const errorClasses = 'bg-error-lighter border-left-1 border-error-dark';
const cellClasses = (col: string) => `${col === 'XXX' ? errorClasses : ''}`;

export const DataTable = (props: {
  caption: string;
  table: Array<Array<string>>;
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
                <td key={colIndex} className={cellClasses(col)}>
                  {col}
                  {col === 'XXX' ? (
                    <button className="usa-button--unstyled">Edit</button>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
