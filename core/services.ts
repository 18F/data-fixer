import { v4 as uuidv4 } from 'uuid';

import { DatasetProjectId, DatasetProject } from './entities';
import { DatasetGateway } from './gateways';

export const GetDatasetProjectService = (
  datasetGateway: DatasetGateway
) => async (datasetProjectId: DatasetProjectId) => {
  return datasetGateway.getDatasetProject(datasetProjectId);
};
export type GetDatasetProjectService = ReturnType<
  typeof GetDatasetProjectService
>;

export const CreateDatasetProjectService = (
  datasetGateway: DatasetGateway
) => async (datasetProject: DatasetProject) => {
  const id = uuidv4();
  return datasetGateway.createDatasetProject(id, datasetProject);
};
export type CreateDatasetProjectService = ReturnType<
  typeof CreateDatasetProjectService
>;
