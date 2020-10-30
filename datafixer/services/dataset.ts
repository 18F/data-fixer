import { Option } from 'fp-ts/Option';
import { v4 as uuidv4 } from 'uuid';

import {
  Dataset,
  DatasetId,
  DatasetProject,
  DatasetProjectDetails,
  Organization,
  OrganizationAlias,
  OrganizationReference,
  ProjectAlias,
  ProjectId,
} from 'datafixer/core';

export interface DatasetGateway {
  getDataset(id: DatasetId): Promise<Dataset | undefined>;
  getDatasetProjectById(id: ProjectId): Promise<DatasetProject | undefined>;
  getDatasetProjectByName(
    organizationAlias: OrganizationAlias,
    alias: ProjectAlias
  ): Promise<DatasetProject | undefined>;
  getFeaturedProjects(): Promise<DatasetProject[]>;
  getOrganizationByAlias(
    alias: OrganizationAlias
  ): Promise<Option<Organization>>;
  getOrganizations(): Promise<Array<Organization>>;
  createDatasetProject(dataset: DatasetProject): void;
  resetFactoryDefaults(): void;
  createDataset(dataset: Dataset): void;
}

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
) => async ({
  organizationAlias,
  alias,
}: {
  organizationAlias: OrganizationAlias;
  alias: ProjectAlias;
}) => {
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

export const CreateMockDatasetService = (
  datasetGateway: DatasetGateway
) => async (
  organizationAlias: OrganizationAlias,
  projectAlias: ProjectAlias
) => {
  // Feed some mock data
  const project = await datasetGateway.getDatasetProjectByName(
    organizationAlias,
    projectAlias
  );
  if (!project) {
    return undefined;
  }
  const datasetId = uuidv4();
  datasetGateway.createDataset({
    id: datasetId,
    projectId: project.id,
    schema: {
      type: 'Schema type',
      description: 'Mock uploaded schema',
    },
    uploadedDate: new Date().toDateString(),
    data: [
      ['Road', 'Start Mile', 'End Mile', 'Description'],
      ['Minnesota 3', '12', '19', 'Flooding'],
      ['Minnesota 39', '35', '44', 'Flooding'],
      ['Minnesota 44', '17', '21', 'Flooding'],
      ['Minnesota 61', '54', '54', 'Accident reported'],
      ['Minnesota 93', '89', '91', 'Flooding'],
    ],
    consumers: [],
    sources: [],
  });
  return datasetId;
};
export type CreateMockDatasetService = ReturnType<
  typeof CreateMockDatasetService
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
    createMockDataset: CreateMockDatasetService(datasetGateway),
  };
};
export type DatasetService = ReturnType<typeof DatasetService>;
