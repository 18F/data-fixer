import { CreateMockDatasetService } from 'datafixer/core/data';
import {
  datasetLocation,
  NewDatasetLocation,
  UpdateLocation,
} from 'datafixer/core/routes';

export type Context = {
  createMockDataset: CreateMockDatasetService;
  updateLocation: UpdateLocation;
};

export const DatasetUploadPresenter = (
  { createMockDataset, updateLocation }: Context,
  location: NewDatasetLocation
) => {
  return {
    createMockDataset: async () => {
      const datasetId = await createMockDataset(
        location.organizationAlias,
        location.alias
      );
      updateLocation(
        datasetLocation(location.organizationAlias, location.alias, datasetId)
      );
    },
    location,
  };
};
export type DatasetUploadPresenter = ReturnType<typeof DatasetUploadPresenter>;
