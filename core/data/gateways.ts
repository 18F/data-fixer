import {
  Dataset,
  DatasetId,
  DatasetProject,
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
  createDatasetProject(id: ProjectId, dataset: DatasetProject): Promise<void>;
  resetFactoryDefaults(): void;
}
