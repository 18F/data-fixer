import { createEffect, createStore, Effect, Store } from 'effector';

import {
  Dataset,
  DatasetId,
  DatasetProject,
  OrganizationAlias,
  ProjectAlias,
} from 'datafixer/core';
import { DatasetLocation, LocationService } from 'datafixer/services/routes';
import {
  GetDatasetProjectService,
  GetDatasetService,
} from 'datafixer/services/dataset';

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

  const getDatasetFx: Effect<
    DatasetId,
    Dataset | undefined,
    Error
  > = createEffect<DatasetId, Dataset | undefined, Error>({
    handler: getDataset,
  });
  const dataset: Store<Dataset | null> = createStore<Dataset | null>(null).on(
    getDatasetFx.done,
    (_, { result }) => result
  );

  const getDatasetProjectFx = createEffect<
    { organizationAlias: OrganizationAlias; alias: ProjectAlias },
    DatasetProject | undefined,
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
