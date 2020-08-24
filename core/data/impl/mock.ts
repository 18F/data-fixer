import {
  Dataset,
  DatasetGateway,
  DatasetId,
  DatasetProject,
  Organization,
  OrganizationId,
  OrganizationAlias,
  ProjectId,
  ProjectAlias,
} from '..';

export type MockData = {
  datasetProjects: Record<ProjectId, DatasetProject>;
  datasets: Record<DatasetId, Dataset>;
  organizations: Record<OrganizationId, Organization>;
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

  async getDatasetProjectById(id: ProjectId) {
    return this.data.datasetProjects[id];
  }

  async getDatasetProjectByName(
    organizationAlias: OrganizationAlias,
    projectAlias: ProjectAlias
  ) {
    const organization = Object.values(this.data.organizations).filter(
      (org: Organization) => org.alias === organizationAlias
    )[0];
    const project = Object.values(this.data.datasetProjects).filter(
      (project: DatasetProject) =>
        project.organization.alias === organizationAlias &&
        project.alias === projectAlias
    )[0];
    return project;
  }

  async getFeaturedProjects() {
    return Object.values(this.data.datasetProjects);
  }

  async createDatasetProject(id: ProjectId, project: DatasetProject) {
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
