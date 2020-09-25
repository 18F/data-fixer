import { createEffect, createStore, Effect, Store } from 'effector';

import {
  Dataset,
  DatasetId,
  DatasetProject,
  GetDatasetProjectService,
  GetDatasetService,
  OrganizationAlias,
  ProjectAlias,
} from 'datafixer/core/data';
import { DatasetLocation, LocationService } from 'datafixer/core/routes';

type Context = {
  getDataset: GetDatasetService;
  getDatasetProject: GetDatasetProjectService;
  locationService: LocationService;
};

export const DatasetPresenter = ({
  getDataset,
  getDatasetProject,
  locationService,
}: Context) => {
  const getLocation = () => locationService.getLocation() as DatasetLocation;

  const getDatasetFx: Effect<DatasetId, Dataset, Error> = createEffect<
    DatasetId,
    Dataset,
    Error
  >({
    handler: getDataset,
  });
  const dataset: Store<Dataset | null> = createStore<Dataset | null>(null).on(
    getDatasetFx.done,
    (_, { result }) => result
  );

  const getDatasetProjectFx = createEffect<
    { organizationAlias: OrganizationAlias; alias: ProjectAlias },
    DatasetProject,
    Error
  >({
    handler: getDatasetProject,
  });
  const datasetProject = createStore<DatasetProject | null>(null).on(
    getDatasetProjectFx.done,
    (_, { result }) => result
  );

  const init = () => {
    const location = getLocation();
    getDatasetFx(location.datasetId);
    getDatasetProjectFx({
      organizationAlias: location.organizationAlias,
      alias: location.alias,
    });
  };

  return {
    init,
    dataset,
    datasetProject,
  };
};
export type DatasetPresenter = ReturnType<typeof DatasetPresenter>;
