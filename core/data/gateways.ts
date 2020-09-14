import { Option } from 'fp-ts/Option';

import {
  Dataset,
  DatasetId,
  DatasetProject,
  Organization,
  OrganizationAlias,
  ProjectId,
  ProjectAlias,
} from './entities';

export interface DatasetGateway {
  getDataset(id: DatasetId): Promise<Dataset>;
  getDatasetProjectById(id: ProjectId): Promise<DatasetProject>;
  getDatasetProjectByName(
    organizationAlias: OrganizationAlias,
    alias: ProjectAlias
  ): Promise<DatasetProject>;
  getFeaturedProjects(): Promise<DatasetProject[]>;
  getOrganizationByAlias(
    alias: OrganizationAlias
  ): Promise<Option<Organization>>;
  getOrganizations(): Promise<Array<Organization>>;
  createDatasetProject(dataset: DatasetProject): Promise<DatasetProject>;
  resetFactoryDefaults(): void;
  createDataset(dataset: Dataset): void;
}
