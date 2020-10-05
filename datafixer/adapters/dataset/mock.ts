import * as O from 'fp-ts/Option';

import {
  Dataset,
  DatasetId,
  DatasetProject,
  Organization,
  OrganizationId,
  OrganizationAlias,
  ProjectId,
  ProjectAlias,
} from 'datafixer/core';
import { DatasetGateway } from 'datafixer/services/dataset';

const WI_DOT = {
  id: 'c1ef709d-20d3-4180-89fd-213e2d2a0414',
  alias: 'widot',
};
const WISCONSIN_PROJECT = {
  id: '4b56b64f-cc78-4834-87db-7a0cf50c28a6',
  alias: 'road-closures',
  organization: {
    id: WI_DOT.id,
    alias: 'widot',
  },
};
const WISCONSIN_DATASET_V1 = 'c072c0d8-1af7-4e9c-b737-f572a28c9a5d';
const WISCONSIN_DATASET_V2 = '4db15d2a-1976-4012-8d87-ab0e917476be';

const MN_DOT = {
  id: 'b8102294-766f-4bda-ad8b-6f6468a77c21',
  alias: 'mndot',
};
const MINNESOTA_PROJECT = {
  id: '14eef704-8000-4c26-8bf3-2c91c1f9e7fe',
  alias: 'road-closures',
  organization: {
    id: MN_DOT.id,
    alias: 'mndot',
  },
};
const MINNESOTA_DATASET_V1 = '86e1b950-af83-4063-9d6f-694fff299019';

const US_DOT = {
  id: 'ee24d50c-f39f-4047-8fed-1fb2b20b6fd6',
  alias: 'usdot',
};
const DOT_PROJECT = {
  id: 'a897f990-9e1b-428c-bf63-4585290a947e',
  alias: 'road-closures',
  organization: {
    id: US_DOT.id,
    alias: 'usdot',
  },
};
const DOT_DATASET_V1 = '3c7b24e1-696b-4490-9deb-5140f07993df';
const DOT_DATASET_V2 = '7c81fc21-fefd-4dc8-9df5-e0aeb571b293';

const COVID_ORG = {
  id: '68172cc0-032b-11eb-a84f-f218984f7ebf',
  alias: 'covid19',
};
const COVID_AUSTRALIA = {
  id: '8e1d55de-032b-11eb-a84f-f218984f7ebf',
  alias: 'australia',
  organization: {
    id: COVID_ORG.id,
    alias: 'covid19',
  },
};
const COVID_AUSTRALIA_DATASET_V1 = '9d06b1d0-032b-11eb-a84f-f218984f7ebf';
const COVID_AUSTRALIA_DATA = [
  [
    'Province State',
    'Country Region',
    'Latitude',
    'Longitude',
    'Last Update',
    'Confirmed Cases',
    'Recovered Cases',
  ],
  [
    'Australian Capital Territory',
    { value: 'Austraia', suggestion: 'Australia' },
    '-35.4735',
    '149.0124',
    '2020-08-20 04:27:43',
    { value: '0113', suggestion: '113' },
    '110',
  ],
  [
    'New South Wales',
    { value: 'Australa', suggestion: 'Australia' },
    '-33.8688',
    '151.2093',
    '2020-08-20 04:27:43',
    '3971',
    '2995',
  ],
  [
    'Northern Territory',
    { value: 'Austria', suggestion: 'Australia' },
    '-12.4634',
    '130.8456',
    { value: '02020-08-20 04:27:43', suggestion: '2020-08-20 04:27:43' },
    '33',
    '31',
  ],
  [
    'Queensland',
    { value: 'Anstralia', suggestion: 'Australia' },
    '-27.4698',
    '153.0251',
    '2020-08-20 04:27:43',
    '1093',
    '1081',
  ],
  [
    'South Australia',
    { value: 'Aust', suggestion: 'Australia' },
    '-34.9285',
    '138.6007',
    '2020-08-20 04:27:43',
    { value: '0462', suggestion: '462' },
    '452',
  ],
  [
    'Tasmania',
    { value: 'Australa', suggestion: 'Australia' },
    '-42.8821',
    '147.3272',
    '2020-08-20 04:27:43',
    '230',
    '216',
  ],
  [
    'Victoria',
    { value: 'Austr', suggestion: 'Australia' },
    '-37.8136',
    '144.9631',
    { value: '22020-08-20 04:27:43', suggestion: '2020-08-20 04:27:43' },
    '17683',
    '9729',
  ],
  [
    'Western Australia',
    { value: 'Aussie', suggestion: 'Australia' },
    '-31.9505',
    '115.8605',
    '2020-08-20 04:27:43',
    '651',
    '633',
  ],
];

export const mockData: MockData = {
  datasets: {
    [WISCONSIN_DATASET_V1]: {
      id: WISCONSIN_DATASET_V1,
      projectId: WISCONSIN_PROJECT.id,
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      uploadedDate: '2020-10-10 04:23:43',
      data: [
        ['hwy', 'mile', 'info'],
        ['60', '10', 'repaving'],
        ['51', '87', 'accident'],
        ['151', '5', 'bridge construction'],
      ],
      consumers: [DOT_DATASET_V1],
      sources: [],
    },
    [WISCONSIN_DATASET_V2]: {
      id: WISCONSIN_DATASET_V2,
      projectId: WISCONSIN_PROJECT.id,
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      uploadedDate: '2020-10-10 04:23:43',
      data: [
        ['hwy', 'mile', 'info'],
        ['60', '10', 'repaving'],
        ['151', '5', 'bridge construction'],
        ['I90', '61', 'exit 61 ramp closure'],
        ['30', '87', 'accident'],
      ],
      consumers: [DOT_DATASET_V2],
      sources: [],
    },
    [MINNESOTA_DATASET_V1]: {
      id: MINNESOTA_DATASET_V1,
      projectId: MINNESOTA_PROJECT.id,
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      uploadedDate: '2020-10-10 04:23:43',
      data: [
        ['hwy', 'mile', 'info'],
        ['I94', '98', 'accident'],
        ['I35', '55', 'flooding'],
      ],
      consumers: [DOT_DATASET_V1],
      sources: [],
    },
    [DOT_DATASET_V1]: {
      id: DOT_DATASET_V1,
      projectId: DOT_PROJECT.id,
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      uploadedDate: '2020-10-10 04:23:43',
      data: [
        ['state', 'hwy', 'mile', 'info'],
        ['WI', '60', '10', 'repaving'],
        ['WI', '51', '87', 'accident'],
        ['WI', '151', '5', 'bridge construction'],
        ['MN', 'I94', '98', 'accident'],
        ['MN', 'I35', '55', 'flooding'],
      ],
      consumers: [],
      sources: [MINNESOTA_DATASET_V1, WISCONSIN_DATASET_V1],
    },
    [DOT_DATASET_V2]: {
      id: DOT_DATASET_V2,
      projectId: DOT_PROJECT.id,
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      uploadedDate: '2020-10-10 04:23:43',
      data: [
        ['state', 'hwy', 'mile', 'info'],
        ['WI', '60', '10', 'repaving'],
        ['WI', '151', '5', 'bridge construction'],
        ['WI', 'I90', '61', 'exit 61 ramp closure'],
        ['WI', '30', '87', 'accident'],
        ['MN', 'I94', '98', 'accident'],
        ['MN', 'I35', '55', 'flooding'],
      ],
      consumers: [],
      sources: [MINNESOTA_DATASET_V1, WISCONSIN_DATASET_V1],
    },
    [COVID_AUSTRALIA_DATASET_V1]: {
      id: COVID_AUSTRALIA_DATASET_V1,
      projectId: COVID_AUSTRALIA.id,
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      uploadedDate: '2020-10-10 04:23:43',
      data: COVID_AUSTRALIA_DATA,
      consumers: [],
      sources: [],
    },
  },
  datasetProjects: {
    [WISCONSIN_PROJECT.id]: {
      id: WISCONSIN_PROJECT.id,
      organization: WI_DOT,
      alias: 'road-closures',
      source: {
        type: 'upload',
      },
      consumers: [DOT_PROJECT],
      details: {
        title: 'Wisconsin Reported Road Closures',
        source: 'Wisconsin Department of Motor Vehicles',
        description:
          'Comprehensive list of all road closures on Wisconsin state and county highways.',
      },
      datasetVersions: [WISCONSIN_DATASET_V1, WISCONSIN_DATASET_V2],
    },
    [MINNESOTA_PROJECT.id]: {
      id: MINNESOTA_PROJECT.id,
      organization: MN_DOT,
      alias: 'road-closures',
      source: {
        type: 'upload',
      },
      consumers: [DOT_PROJECT],
      details: {
        title: 'Minnesota Reported Road Closures',
        source: 'Minnesota Department of Motor Vehicles',
        description:
          'Comprehensive list of all road closures on Minnesota state and county highways.',
      },
      datasetVersions: [MINNESOTA_DATASET_V1],
    },
    [DOT_PROJECT.id]: {
      id: DOT_PROJECT.id,
      organization: US_DOT,
      alias: 'road-closures',
      source: {
        type: 'aggregate',
        projects: [WISCONSIN_PROJECT, MINNESOTA_PROJECT],
      },
      consumers: [],
      details: {
        title: 'United States Aggregated Road Closures',
        source: 'United States Department of Transportation',
        description:
          'Aggregated collection of all state-reported road closures in the United States.',
      },
      datasetVersions: [DOT_DATASET_V1, DOT_DATASET_V2],
    },
    [COVID_AUSTRALIA.id]: {
      id: COVID_AUSTRALIA.id,
      organization: COVID_ORG,
      alias: 'covid-statistics',
      source: {
        type: 'upload',
      },
      consumers: [],
      details: {
        title: 'Australian COVID-19 statistics',
        source: '',
        description: 'Australian COVID-19 statistics by province',
      },
      datasetVersions: [COVID_AUSTRALIA_DATASET_V1],
    },
  },
  organizations: {
    [MN_DOT.id]: {
      id: MN_DOT.id,
      name: 'Minnesota Department of Transportation',
      alias: 'mndot',
    },
    [US_DOT.id]: {
      id: US_DOT.id,
      name: 'United States Department of Transportation',
      alias: 'usdot',
    },
    [WI_DOT.id]: {
      id: WI_DOT.id,
      name: 'Wisconsin Department of Transportation',
      alias: 'widot',
    },
  },
};

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

  async createDataset(dataset: Dataset) {
    const project = await this.getDatasetProjectById(dataset.projectId);
    this._setData({
      ...this.data,
      datasets: {
        ...this.data.datasets,
        [dataset.id]: dataset,
      },
      datasetProjects: {
        ...this.data.datasetProjects,
        [project.id]: {
          ...project,
          datasetVersions: project.datasetVersions.concat(dataset.id),
        },
      },
    });
  }
}
