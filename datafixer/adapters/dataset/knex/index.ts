import * as O from 'fp-ts/Option';
import Knex from 'knex';

import { DatasetGateway } from 'datafixer/services/dataset';
import {
  Dataset,
  DatasetId,
  DatasetProject,
  Organization,
  OrganizationAlias,
  OrganizationId,
  ProjectAlias,
  ProjectId,
} from 'datafixer/core';
import { mockData } from '../mock';

type KnexDatasetGatewayContext = {
  db: Knex;
};

interface DbDataset {
  id: DatasetId;
  project_id: ProjectId;
  format: string;
}

interface DbProject {
  id: ProjectId;
  alias: ProjectAlias;
  organization_id: OrganizationId;
  source_type: string;
  title: string;
  description: string;
}

interface DbOrganization {
  id: OrganizationId;
  alias: OrganizationAlias;
  source_type: string;
  title: string;
  description: string;
}

export class KnexDatasetGateway implements DatasetGateway {
  constructor(private ctx: KnexDatasetGatewayContext) {}

  async getDataset(id: DatasetId) {
    const dbDataset = await this.ctx
      .db<DbDataset>('datasets')
      .where('id', id)
      .select()
      .first();
    if (!dbDataset) {
      return undefined;
    }
    return {
      id,
      projectId: dbDataset.project_id,
      schema: {
        type: dbDataset.format,
        description: dbDataset.format,
      },
      // temporary hacks to accomodate existing types
      uploadedDate: 'uploadedDate',
      data: mockData.datasets[id].data,
      consumers: mockData.datasets[id].consumers,
      sources: mockData.datasets[id].sources,
    };
  }

  _projectForDbProject(dbProject: DbProject): DatasetProject {
    return {
      id: dbProject.id,
      organization: {
        id: dbProject.organization_id,
        alias: 'TODO',
      },
      alias: dbProject.alias,
      source: {
        //type: dbProject.source_type,
        type: 'upload', // TODO temp
      },
      // temporary, to deal with the existing types:
      consumers: mockData.datasetProjects[dbProject.id].consumers,
      details: {
        title: dbProject.title,
        description: dbProject.description,
        source: dbProject.source_type,
      },
      datasetVersions: mockData.datasetProjects[dbProject.id].datasetVersions,
    };
  }

  async getDatasetProjectById(id: ProjectId) {
    const dbProject = await this.ctx
      .db<DbProject>('projects')
      .where('id', id)
      .select()
      .first();
    if (!dbProject) {
      return undefined;
    }
    return this._projectForDbProject(dbProject);
  }

  async getDatasetProjectByName(
    organizationAlias: OrganizationAlias,
    projectAlias: ProjectAlias
  ) {
    const dbProject = await this.ctx
      .db<DbProject>('projects')
      .join(
        'organizations',
        'projects.organization_id',
        '=',
        'organizations.id'
      )
      .where('alias', projectAlias)
      .where('organization.alias', organizationAlias)
      .whereNot('organizations.id', null)
      .select()
      .first();
    if (!dbProject) {
      return undefined;
    }
    return this._projectForDbProject(dbProject);
  }

  async getFeaturedProjects() {
    const dbProjects = await this.ctx
      .db<DbProject>('projects')
      .select()
      .limit(10);
    return dbProjects.map(project => this._projectForDbProject(project));
  }

  async getOrganizationByAlias(
    alias: OrganizationAlias
  ): Promise<O.Option<Organization>> {
    const organization = await this.ctx
      .db<DbOrganization>('organizations')
      .where('alias', alias)
      .select()
      .first();
    if (!organization) {
      return O.none;
    }
    return O.some({
      id: organization.id,
      name: organization.title,
      alias: organization.alias,
    });
  }

  async getOrganizations(): Promise<Array<Organization>> {
    const dbOrganizations = await this.ctx
      .db<DbOrganization>('organizations')
      .select()
      .limit(10);
    return (dbOrganizations || []).map(organization => {
      return {
        id: organization.id,
        name: organization.title,
        alias: organization.alias,
      };
    });
  }

  async createDatasetProject(project: DatasetProject) {
    await this.ctx.db<DbProject>('projects').insert({
      id: project.id,
      alias: project.alias,
      organization_id: project.organization.id,
      source_type: 'upload',
      title: project.details.title,
      description: project.details.description,
    });
  }

  resetFactoryDefaults() {
    // no-op this - method to be removed
  }

  async createDataset(dataset: Dataset) {
    await this.ctx.db<DbDataset>('datasets').insert({
      id: dataset.id,
      project_id: dataset.projectId,
      format: dataset.schema.type,
    });
  }
}
