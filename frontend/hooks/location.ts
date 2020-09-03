import { useState } from 'react';

import { parseLocation, getUrl, Location, Router } from '../routes';

export const useLocation = (): Router => {
  const [currentLocation, setLocation] = useState<Location>(
    parseLocation(window.location.pathname)
  );

  const updateLocation = (newLocation: Location) => {
    setLocation(newLocation);
    window.history.pushState(null, '', getUrl(newLocation));
  };

  window.addEventListener('popstate', () => {
    setLocation(parseLocation(window.location.pathname));
  });

  return { currentLocation, updateLocation };
};
