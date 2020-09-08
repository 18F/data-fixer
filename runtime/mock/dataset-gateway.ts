import * as O from 'fp-ts/Option';

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
} from 'datafixer/core/data';

import { mockData } from './mock-data';

export type MockData = {
  datasetProjects: Record<ProjectId, DatasetProject>;
  datasets: Record<DatasetId, Dataset>;
  organizations: Record<OrganizationId, Organization>;
};

type MockDatasetGatewayContext = {
  localStorage: Storage;
};

export class MockDatasetGateway implements DatasetGateway {
  data: MockData;

  constructor(
    private ctx: MockDatasetGatewayContext,
    private initialMockData: MockData = mockData
  ) {
    this.data = this._getData() || initialMockData;
    this._setData(this.data);
  }

  _getData() {
    const data = this.ctx.localStorage.getItem('mockData');
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  _setData(data: MockData) {
    this.data = data;
    this.ctx.localStorage.setItem('mockData', JSON.stringify(data));
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
    const project = Object.values(this.data.datasetProjects).filter(
      (project: DatasetProject) =>
        project.organization.alias === organizationAlias &&
        project.alias === projectAlias
    )[0];
    console.log('returning', project);
    return project;
  }

  async getFeaturedProjects() {
    return Object.values(this.data.datasetProjects);
  }

  getOrganizationByAlias(
    alias: OrganizationAlias
  ): Promise<O.Option<Organization>> {
    return Promise.resolve(
      O.fromNullable(
        Object.values(this.data.organizations).find(org => org.alias === alias)
      )
    );
  }

  async getOrganizations(): Promise<Array<Organization>> {
    return Object.values(this.data.organizations);
  }

  async createDatasetProject(project: DatasetProject) {
    this._setData({
      ...this.data,
      datasetProjects: {
        ...this.data.datasetProjects,
        [project.id]: project,
      },
    });
    return project;
  }

  resetFactoryDefaults() {
    this._setData(this.initialMockData);
  }
}
