import React from 'react';

export const DataVersions = (props: {
  thisVersion: string;
  versions: string[];
}) => {
  return (
    <figure>
      <figcaption>
        Other version{props.versions.length > 1 ? 's' : ''}
      </figcaption>
      <ul className="usa-list">
        {props.versions.map(version => (
          <li>
            {props.thisVersion === version ? (
              `Version ${version}`
            ) : (
              <a href={`#version-${version}`}>Version {version}</a>
            )}
          </li>
        ))}
      </ul>
    </figure>
  );
};
