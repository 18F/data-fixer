import {
  Dataset,
  DatasetId,
  DatasetProject,
  DatasetProjectId,
} from './entities';

export interface DatasetGateway {
  getDataset(id: DatasetId): Promise<Dataset>;
  getDatasetProject(id: DatasetProjectId): Promise<DatasetProject>;
  createDatasetProject(
    id: DatasetProjectId,
    dataset: DatasetProject
  ): Promise<void>;
  resetFactoryDefaults(): void;
}
