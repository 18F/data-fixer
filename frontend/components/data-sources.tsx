import React from 'react';

export const DataSources = (props: { urls: string[] }) => {
  return (
    <figure>
      <figcaption>Data source{props.urls.length > 1 ? 's' : ''}</figcaption>
      <ul className="usa-list">
        {props.urls.map(url => (
          <li>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
    </figure>
  );
};
