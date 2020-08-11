import { DatasetId } from './entities';
import { GetDatasetGateway } from './gateways';

export const GetDatasetService = (getDataset: GetDatasetGateway) => async (
  datasetId: DatasetId
) => {
  return getDataset(datasetId);
};

export type GetDatasetService = ReturnType<typeof GetDatasetService>;
