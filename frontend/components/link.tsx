import React from 'react';

import { getUrl, Location } from '../routes';

export const Link = ({
  to,
  updateLocation,
  children,
}: {
  to: Location;
  updateLocation: (location: Location) => void;
  children: React.ReactNode;
}) => (
  <a
    href={getUrl(to)}
    onClick={event => {
      event.preventDefault();
      updateLocation(to);
    }}
  >
    {children}
  </a>
);
