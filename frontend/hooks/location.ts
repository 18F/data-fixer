import { useState } from 'react';

import { parseLocation, getUrl, Location } from '../routes';

export const useLocation = (): [Location, (location: Location) => void] => {
  const [location, setRoute] = useState<Location>(
    parseLocation(window.location.pathname)
  );

  const updateLocation = (newLocation: Location) => {
    setRoute(newLocation);
    window.history.pushState(null, '', getUrl(newLocation));
  };

  window.addEventListener('popstate', () => {
    setRoute(parseLocation(window.location.pathname));
  });

  return [location, updateLocation];
};
