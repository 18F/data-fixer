import { MockData, MockDatasetGateway } from 'datafixer/core/gateways';
import {
  CreateDatasetProjectService,
  GetDatasetProjectService,
} from 'datafixer/core/services';
import { RenderPage } from 'datafixer/frontend';

const mockData: MockData = {
  datasets: {
    'c072c0d8-1af7-4e9c-b737-f572a28c9a5d': {
      id: '3e66a3b2-aa96-4319-8a58-646126d9d793',
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      data: [
        ['I94', '98', 'accident'],
        ['I35', '55', 'flooding'],
      ],
    },
    '86e1b950-af83-4063-9d6f-694fff299019': {
      id: '3e66a3b2-aa96-4319-8a58-646126d9d793',
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      data: [['I94', '98', 'accident']],
    },
    '3c7b24e1-696b-4490-9deb-5140f07993df': {
      id: '3e66a3b2-aa96-4319-8a58-646126d9d793',
      schema: {
        type: 'Schema type',
        description: 'SCHEMA HERE',
      },
      data: [
        ['60', '10', 'repaving'],
        ['151', '5', 'bridge construction'],
        ['I90', '61', 'exit 61 ramp closure'],
        ['30', '87', 'accident'],
        ['I94', '98', 'accident'],
        ['I35', '55', 'flooding'],
      ],
    },
  },
  datasetProjects: {
    '4b56b64f-cc78-4834-87db-7a0cf50c28a6': {
      id: '4b56b64f-cc78-4834-87db-7a0cf50c28a6',
      source: {
        type: 'upload',
      },
      details: {
        title: 'Wisconsin DMV Test Dataset',
        source: '',
        description:
          'Comprehensive list of all road closures on Wisconsin state and county highways.',
      },
      datasetVersions: [
        'c072c0d8-1af7-4e9c-b737-f572a28c9a5d',
        '86e1b950-af83-4063-9d6f-694fff299019',
      ],
    },
    'a897f990-9e1b-428c-bf63-4585290a947e': {
      id: 'a897f990-9e1b-428c-bf63-4585290a947e',
      source: {
        type: 'upload',
      },
      details: {
        title: 'Minnesota DMV Test Dataset',
        source: '',
        description:
          'Comprehensive list of all road closures on Minnesota state and county highways.',
      },
      datasetVersions: ['3c7b24e1-696b-4490-9deb-5140f07993df'],
    },
    '3e66a3b2-aa96-4319-8a58-646126d9d793': {
      id: '3e66a3b2-aa96-4319-8a58-646126d9d793',
      source: {
        type: 'aggregate',
        projects: [
          {
            id: '4b56b64f-cc78-4834-87db-7a0cf50c28a6',
            details: {},
          },
          {
            id: 'a897f990-9e1b-428c-bf63-4585290a947e',
            details: {},
          },
        ],
      },
      details: {
        title: 'Upper Midwest aggregate state road closures',
        source: '',
        description:
          'Aggregate list of all road closures in the Upper Midwest.',
      },
      datasetVersions: ['3c7b24e1-696b-4490-9deb-5140f07993df'],
    },
  },
};

const datasetGateway = new MockDatasetGateway(mockData);
const createDatasetProject = CreateDatasetProjectService(datasetGateway);
const getDatasetProject = GetDatasetProjectService(datasetGateway);
const renderPage = RenderPage(createDatasetProject, getDatasetProject);

// App entrypoint - render a dummy page
renderPage();
