import React from 'react';

export const DataSchema = () => {
  return (
    <div>
      <dl>
        <dt>Schema type</dt>
        <dd>Postgres DDL</dd>
      </dl>
      <code>
        CREATE TABLE table_name ( col1 datatype, col2 datatype, col3 datatype,
        col4 datatype );
      </code>
    </div>
  );
};
