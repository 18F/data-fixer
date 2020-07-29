import React from 'react';

export const DataConsumers = (props: { urls: string[] }) => {
  return (
    <figure>
      <figcaption>Data consumer{props.urls.length > 1 ? 's' : ''}</figcaption>
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
