import {
  Dataset,
  DatasetGateway,
  DatasetId,
  DatasetProject,
  DatasetProjectId,
} from '..';

export type MockData = {
  datasetProjects: Record<DatasetProjectId, DatasetProject>;
  datasets: Record<DatasetId, Dataset>;
};

export class MockDatasetGateway implements DatasetGateway {
  data: MockData;

  constructor(private initialMockData: MockData) {
    this.data = initialMockData;
    this._setData(initialMockData);
  }

  _setData(data: MockData) {
    this.data = data;
    window.localStorage.setItem('mockData', JSON.stringify(data));
  }

  async getDataset(id: DatasetId) {
    return this.data.datasets[id];
  }

  async getDatasetProject(id: DatasetProjectId) {
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

  resetFactoryDefaults() {
    this._setData(this.initialMockData);
  }
}
