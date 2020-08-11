import { getMockDatasetGateway } from 'datafixer/core/gateways';
import { GetDatasetService } from 'datafixer/core/services';
import { RenderPage } from 'datafixer/frontend';

const mockData = {
  id1v1: {
    id: 'id1v1',
    title: 'Wisconsin DMV Test Dataset',
    source: 'Wisconsin DMV',
    description:
      'Comprehensive list of all road closures on Wisconsin state and county highways.',
    lastModified: '2012-10-10',
    versions: ['id1v1', 'id1v2'],
    sources: [],
    consumers: ['id3v1'],
    table: [
      ['hwy', 'mile', 'info'],
      ['60', '10', 'repaving'],
      ['51', '87', 'accident'],
      ['151', '5', 'bridge construction'],
    ],
    schema: {
      type: 'JSON Schema',
      description: 'SCHEMA HERE',
    },
  },
  id1v2: {
    id: 'id1v2',
    title: 'Wisconsin DMV Test Dataset',
    source: 'Wisconsin DMV',
    description:
      'Comprehensive list of all road closures on Wisconsin state and county highways.',
    lastModified: '2012-10-20',
    versions: ['id1v1', 'id1v2'],
    sources: [],
    consumers: ['id3v1'],
    table: [
      ['hwy', 'mile', 'info'],
      ['60', '10', 'repaving'],
      ['151', '5', 'bridge construction'],
      ['I90', '61', 'exit 61 ramp closure'],
      ['30', '87', 'accident'],
    ],
    schema: {
      type: 'JSON Schema',
      description: 'SCHEMA HERE',
    },
  },
  id2v1: {
    id: 'id2v1',
    title: 'Minnesota DMV Test Dataset',
    source: 'Minnesota DMV',
    description:
      'Comprehensive list of all road closures on Minnesota state and county highways.',
    lastModified: '2012-10-10',
    versions: ['id1v1'],
    sources: [],
    consumers: ['id3v1'],
    table: [
      ['hwy', 'mile', 'info'],
      ['I94', '98', 'accident'],
      ['I35', '55', 'flooding'],
    ],
    schema: {
      type: 'JSON Schema',
      description: 'SCHEMA HERE',
    },
  },
  id3v1: {
    id: 'id3v1',
    title: 'Upper Midwest aggregate state road closures',
    source: '',
    description: 'Aggregate list of all road closures in the Upper Midwest.',
    lastModified: '2012-12-10',
    versions: ['id3v1'],
    sources: ['id1v2', 'id2v1'],
    consumers: [],
    table: [
      ['state', 'hwy', 'mile', 'info'],
      ['WI', '60', '10', 'repaving'],
      ['WI', '151', '5', 'bridge construction'],
      ['WI', 'I90', '61', 'exit 61 ramp closure'],
      ['WI', '30', '87', 'accident'],
      ['MN', 'I94', '98', 'accident'],
      ['MN', 'I35', '55', 'flooding'],
    ],
    schema: {
      type: 'JSON Schema',
      description: 'SCHEMA HERE',
    },
  },
};

const getDataset = GetDatasetService(getMockDatasetGateway(mockData));
const renderPage = RenderPage(getDataset);

// App entrypoint - render a dummy page
renderPage();
