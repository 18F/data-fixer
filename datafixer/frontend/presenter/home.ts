import { createDomain, Store } from 'effector';

import { DatasetProject } from 'datafixer/core';
import { LocationService } from 'datafixer/services/routes';
import {
  GetFeaturedProjectsService,
  ResetFactoryDefaultsService,
} from 'datafixer/services/dataset';

type Context = {
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

  const featuredProjects: Store<DatasetProject[]> = HomeDomain.store<
    DatasetProject[]
  >([]).on(getFeaturedProjects.done, (_, { result }) => result);

  const resetFactoryDefaults = () => {
    ctx.resetFactoryDefaults();
    ctx.locationService.reload();
  };

  // Start loading featured projects immediately.
  const init = () => {
    getFeaturedProjects();
  };

  return {
    init,
    featuredProjects,
    resetFactoryDefaults,
  };
};
export type HomePresenter = ReturnType<typeof HomePresenter>;
