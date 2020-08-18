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
}

export type MockData = {
  datasetProjects: Record<DatasetProjectId, DatasetProject>;
  datasets: Record<DatasetId, Dataset>;
};

export class MockDatasetGateway implements DatasetGateway {
  constructor(private data: MockData) {
    this._setData(data);
  }

  _setData(data: MockData) {
    this.data = data;
    window.localStorage.setItem('mockData', JSON.stringify(data));
  }

  async getDataset(id: DatasetId) {
    return this.data.datasets[id];
  }

  async getDatasetProject(id: DatasetProjectId) {
    console.log(id, this.data.datasetProjects);
    return this.data.datasetProjects[id];
  }

  async createDatasetProject(id: DatasetProjectId, project: DatasetProject) {
    this._setData({
      ...this.data,
      datasetProjects: {
        ...this.data.datasetProjects,
        [id]: project,
      },
    });
  }
}
