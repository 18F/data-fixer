import { CreateMockDatasetService } from 'datafixer/services/dataset';
import {
  datasetLocation,
  LocationService,
  NewDatasetLocation,
} from 'datafixer/services/routes';

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
      if (!datasetId) {
        return undefined;
      }
      locationService.setLocation(
        datasetLocation(location.organizationAlias, location.alias, datasetId)
      );
    },
    getLocation,
  };
};
export type DatasetUploadPresenter = ReturnType<typeof DatasetUploadPresenter>;
