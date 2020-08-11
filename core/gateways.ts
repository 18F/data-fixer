import { Dataset, DatasetId } from './entities';

export type GetDatasetGateway = (datasetId: DatasetId) => Promise<Dataset>;

export const getMockDatasetGateway = (
  mockData: Record<string, Dataset>
): GetDatasetGateway => async (datasetId: DatasetId) => {
  return mockData[datasetId];
};
