import { createDomain, createEffect, createStore, Store } from 'effector';

import {
  DatasetProject,
  GetDatasetProjectService,
  OrganizationAlias,
  ProjectAlias,
} from 'datafixer/core/data';
import {
  LocationService,
  newDataset,
  ProjectLocation,
} from 'datafixer/core/routes';

type Context = {
  getDatasetProject: GetDatasetProjectService;
  locationService: LocationService;
};

export const DatasetProjectPresenter = ({
  getDatasetProject,
  locationService,
}: Context) => {
  const getLocation = () => locationService.getLocation() as ProjectLocation;

  const getDatasetProjectFx = createEffect<
    { organizationAlias: OrganizationAlias; alias: ProjectAlias },
    DatasetProject,
    Error
  >({
    handler: getDatasetProject,
  });
  const datasetProject: Store<DatasetProject | null> = createStore<DatasetProject | null>(
    null
  ).on(getDatasetProjectFx.done, (_, { result }) => result);

  return {
    init: () => {
      const location = getLocation();
      getDatasetProjectFx({
        organizationAlias: location.organizationAlias,
        alias: location.alias,
      });
    },
    datasetProject,
    getNewDatasetLocation: () => {
      const location = getLocation();
      return newDataset(location.organizationAlias, location.alias);
    },
  };
};
export type DatasetProjectPresenter = ReturnType<
  typeof DatasetProjectPresenter
>;
