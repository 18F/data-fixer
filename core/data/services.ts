import { Option } from 'fp-ts/Option';
import { v4 as uuidv4 } from 'uuid';

import {
  DatasetId,
  DatasetProject,
  DatasetProjectDetails,
  Organization,
  OrganizationAlias,
  OrganizationReference,
  ProjectAlias,
} from './entities';
import { DatasetGateway } from './gateways';

export const CreateDatasetProjectService = (
  datasetGateway: DatasetGateway
) => async (
  organizationReference: OrganizationReference,
  alias: ProjectAlias,
  datasetProjectDetails: DatasetProjectDetails
) => {
  const datasetProject: DatasetProject = {
    id: uuidv4(),
    organization: organizationReference,
    alias: alias,
    source: {
      type: 'upload',
    },
    consumers: [],
    details: datasetProjectDetails,
    datasetVersions: [],
  };
  return datasetGateway.createDatasetProject(datasetProject);
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

export const GetOrganizationService = (
  datasetGateway: DatasetGateway
) => async (
  organizationAlias: OrganizationAlias
): Promise<Option<Organization>> => {
  return await datasetGateway.getOrganizationByAlias(organizationAlias);
};
export type GetOrganizationService = ReturnType<typeof GetOrganizationService>;

export const GetOrganizationsService = (
  datasetGateway: DatasetGateway
) => async (): Promise<Array<Organization>> => {
  return await datasetGateway.getOrganizations();
};
export type GetOrganizationsService = ReturnType<
  typeof GetOrganizationsService
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
    getOrganization: GetOrganizationService(datasetGateway),
    getOrganizations: GetOrganizationsService(datasetGateway),
    resetFactoryDefaults: ResetFactoryDefaultsService(datasetGateway),
  };
};
export type DatasetService = ReturnType<typeof DatasetService>;