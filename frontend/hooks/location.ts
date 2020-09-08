import { useState } from 'react';

import { Location, LocationService, Router } from 'datafixer/core/routes';

type UseLocationContext = {
  locationService: LocationService;
};

export const useLocation = (ctx: UseLocationContext): Router => {
  const [currentLocation, setLocation] = useState<Location>(
    ctx.locationService.getLocation()
  );
  ctx.locationService.changeEvent.addListener(setLocation);

  const updateLocation = (newLocation: Location) => {
    ctx.locationService.setLocation(newLocation);
  };

  return { currentLocation, updateLocation };
};
