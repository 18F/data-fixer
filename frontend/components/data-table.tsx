import React from 'react';

export const DataTable = (props: { caption: string }) => {
  return (
    <>
      <table className="usa-table">
        <caption>{props.caption}</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Col1</th>
            <th scope="col">Col2</th>
            <th scope="col">Col3</th>
            <th scope="col">Col4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Val1</td>
            <td>Val2</td>
            <td>Val3</td>
            <td>Val4</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Val1</td>
            <td>Val2</td>
            <td>Val3</td>
            <td>Val4</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Val1</td>
            <td>Val2</td>
            <td>Val3</td>
            <td>Val4</td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>Val1</td>
            <td>Val2</td>
            <td>Val3</td>
            <td>Val4</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
