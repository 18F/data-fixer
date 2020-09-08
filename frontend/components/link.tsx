import React from 'react';

import { getUrl, Location } from 'datafixer/core/routes';

export const Link = ({
  className,
  to,
  updateLocation,
  children,
}: {
  className?: string;
  to: Location;
  updateLocation: (location: Location) => void;
  children: React.ReactNode;
}) => (
  <a
    className={className}
    href={getUrl(to)}
    onClick={event => {
      // If this click has a modifier applied (eg, open in new tab), use the
      // standard browser behavior.
      if (
        event.ctrlKey ||
        event.shiftKey ||
        event.metaKey || // Mac command key
        (event.button && event.button == 1) // middle button
      ) {
        return;
      }
      event.preventDefault();
      updateLocation(to);
    }}
  >
    {children}
  </a>
);
