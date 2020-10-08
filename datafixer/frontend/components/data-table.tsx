import React from 'react';

const errorClasses = 'bg-error-lighter border-left-1 border-error-dark';
const cellClasses = (col: any) => `${col.suggestion ? errorClasses : ''}`;

export const DataTable = (props: {
  caption: string;
  table: Array<Array<any>>;
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
                  {col.value || col}
                  {col.suggestion && col.value ? (
                    <button
                      className="usa-button--unstyled float-right"
                      title={`Suggestion: ${col.suggestion}`}
                    >
                      Edit
                    </button>
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
