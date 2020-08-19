import { v4 as uuidv4 } from 'uuid';

import { DatasetId, DatasetProjectId, DatasetProject } from './entities';
import { DatasetGateway, MockDatasetGateway } from './gateways';

export const CreateDatasetProjectService = (
  datasetGateway: DatasetGateway
) => async (datasetProject: DatasetProject) => {
  const id = uuidv4();
  return datasetGateway.createDatasetProject(id, datasetProject);
};
export type CreateDatasetProjectService = ReturnType<
  typeof CreateDatasetProjectService
>;

export const GetDatasetProjectService = (
  datasetGateway: DatasetGateway
) => async (datasetProjectId: DatasetProjectId) => {
  return datasetGateway.getDatasetProject(datasetProjectId);
};
export type GetDatasetProjectService = ReturnType<
  typeof GetDatasetProjectService
>;

export const GetDatasetService = (datasetGateway: DatasetGateway) => async (
  datasetId: DatasetId
) => {
  return datasetGateway.getDataset(datasetId);
};
export type GetDatasetService = ReturnType<typeof GetDatasetService>;
