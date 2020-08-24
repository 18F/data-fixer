import { v4 as uuidv4 } from 'uuid';

import {
  DatasetId,
  DatasetProject,
  OrganizationAlias,
  ProjectAlias,
} from './entities';
import { DatasetGateway } from './gateways';

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
) => async (organizationAlias: OrganizationAlias, alias: ProjectAlias) => {
  return datasetGateway.getDatasetProjectByName(organizationAlias, alias);
};
export type GetDatasetProjectService = ReturnType<
  typeof GetDatasetProjectService
>;

export const GetDatasetService = (datasetGateway: DatasetGateway) => async (
  datasetId: DatasetId
) => {
  return await datasetGateway.getDataset(datasetId);
};
export type GetDatasetService = ReturnType<typeof GetDatasetService>;

export const GetFeaturedProjectsService = (
  datasetGateway: DatasetGateway
) => async () => {
  return await datasetGateway.getFeaturedProjects();
};
export type GetFeaturedProjectsService = ReturnType<
  typeof GetFeaturedProjectsService
>;

export const ResetFactoryDefaultsService = (
  datasetGateway: DatasetGateway
) => async () => {
  return datasetGateway.resetFactoryDefaults();
};
export type ResetFactoryDefaultsService = ReturnType<
  typeof ResetFactoryDefaultsService
>;

export const DatasetService = (datasetGateway: DatasetGateway) => {
  return {
    createDatasetProject: CreateDatasetProjectService(datasetGateway),
    getDataset: GetDatasetService(datasetGateway),
    getDatasetProject: GetDatasetProjectService(datasetGateway),
    getFeaturedProjects: GetFeaturedProjectsService(datasetGateway),
    resetFactoryDefaults: ResetFactoryDefaultsService(datasetGateway),
  };
};
export type DatasetService = ReturnType<typeof DatasetService>;
