import { MockData, MockDatasetGateway } from 'datafixer/core/data/impl/mock';

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

const mockData: MockData = {
  datasets: {
    [WISCONSIN_DATASET_V1]: {
      id: WISCONSIN_DATASET_V1,
      projectId: WISCONSIN_PROJECT.id,
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
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

export const mockDatasetGateway = new MockDatasetGateway(mockData);
