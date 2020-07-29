import React from 'react';

export const DataInfo = (props: {
  title: string;
  source: string;
  description: string;
  lastModified: Date;
}) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <em>
        Source: {props.source} /
        Last Modified: {props.lastModified.toLocaleString()}
      </em>
      <p>{props.description}</p>
    </div>
  );
};
