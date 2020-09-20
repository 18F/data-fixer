import { createDomain, Event, Store } from 'effector';

import {
  DatasetProject,
  GetFeaturedProjectsService,
  ResetFactoryDefaultsService,
} from 'datafixer/core/data';
import { LocationService } from 'datafixer/core/routes';

export type Context = {
  getFeaturedProjects: GetFeaturedProjectsService;
  locationService: LocationService;
  resetFactoryDefaults: ResetFactoryDefaultsService;
};

export const HomePresenter = (ctx: Context) => {
  const HomeDomain = createDomain('home');

  const getFeaturedProjects = HomeDomain.effect<
    void,
    Array<DatasetProject>,
    Error
  >({ handler: ctx.getFeaturedProjects });

  const featuredProjects = HomeDomain.store<DatasetProject[]>([]).on(
    getFeaturedProjects.done,
    (_, { result }) => result
  );

  const resetFactoryDefaults = () => {
    ctx.resetFactoryDefaults();
    ctx.locationService.reload();
  };

  // Start loading featured projects immediately.
  getFeaturedProjects();

  return {
    featuredProjects,
    resetFactoryDefaults,
  };
};
export type HomePresenter = ReturnType<typeof HomePresenter>;
