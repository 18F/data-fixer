import { CreateMockDatasetService } from 'datafixer/core/data';
import {
  datasetLocation,
  LocationService,
  NewDatasetLocation,
  UpdateLocation,
} from 'datafixer/core/routes';

export type Context = {
  createMockDataset: CreateMockDatasetService;
  locationService: LocationService;
};

export const DatasetUploadPresenter = ({
  createMockDataset,
  locationService,
}: Context) => {
  const getLocation = () => locationService.getLocation() as NewDatasetLocation;
  return {
    createMockDataset: async () => {
      const location = getLocation();
      const datasetId = await createMockDataset(
        location.organizationAlias,
        location.alias
      );
      locationService.setLocation(
        datasetLocation(location.organizationAlias, location.alias, datasetId)
      );
    },
    getLocation,
  };
};
export type DatasetUploadPresenter = ReturnType<typeof DatasetUploadPresenter>;
