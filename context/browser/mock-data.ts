import { MockData } from 'datafixer/core/gateways';

const WISCONSIN_PROJECT = '4b56b64f-cc78-4834-87db-7a0cf50c28a6';
const WISCONSIN_DATASET_V1 = 'c072c0d8-1af7-4e9c-b737-f572a28c9a5d';
const WISCONSIN_DATASET_V2 = '4db15d2a-1976-4012-8d87-ab0e917476be';
const MINNESOTA_PROJECT = '14eef704-8000-4c26-8bf3-2c91c1f9e7fe';
const MINNESOTA_DATASET_V1 = '86e1b950-af83-4063-9d6f-694fff299019';
const DOT_PROJECT = 'a897f990-9e1b-428c-bf63-4585290a947e';
const DOT_DATASET_V1 = '3c7b24e1-696b-4490-9deb-5140f07993df';
const DOT_DATASET_V2 = '7c81fc21-fefd-4dc8-9df5-e0aeb571b293';

export const mockData: MockData = {
  datasets: {
    [WISCONSIN_DATASET_V1]: {
      id: WISCONSIN_DATASET_V1,
      projectId: WISCONSIN_PROJECT,
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
      projectId: WISCONSIN_PROJECT,
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
      projectId: MINNESOTA_PROJECT,
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
      projectId: DOT_PROJECT,
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
      projectId: DOT_PROJECT,
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
    [WISCONSIN_PROJECT]: {
      id: WISCONSIN_PROJECT,
      source: {
        type: 'upload',
      },
      consumers: [DOT_PROJECT],
      details: {
        title: 'Wisconsin DMV Test Dataset',
        source: '',
        description:
          'Comprehensive list of all road closures on Wisconsin state and county highways.',
      },
      datasetVersions: [WISCONSIN_DATASET_V1, WISCONSIN_DATASET_V2],
    },
    [MINNESOTA_PROJECT]: {
      id: MINNESOTA_PROJECT,
      source: {
        type: 'upload',
      },
      consumers: [DOT_PROJECT],
      details: {
        title: 'Minnesota DMV Test Dataset',
        source: '',
        description:
          'Comprehensive list of all road closures on Minnesota state and county highways.',
      },
      datasetVersions: [MINNESOTA_DATASET_V1],
    },
    [DOT_PROJECT]: {
      id: DOT_PROJECT,
      source: {
        type: 'aggregate',
        projects: [
          {
            id: WISCONSIN_PROJECT,
            details: {},
          },
          {
            id: MINNESOTA_PROJECT,
            details: {},
          },
        ],
      },
      consumers: [],
      details: {
        title: 'USDOT aggregate state road closures',
        source: '',
        description:
          'Aggregate list of all state-reported road closures in the United States.',
      },
      datasetVersions: [DOT_DATASET_V1, DOT_DATASET_V2],
    },
  },
};
