import { MockData, MockDatasetGateway } from 'datafixer/core/gateways';
import {
  CreateDatasetProjectService,
  GetDatasetService,
  GetDatasetProjectService,
} from 'datafixer/core/services';
import { RenderPage } from 'datafixer/frontend';
import { mockData } from './mock-data';

const datasetGateway = new MockDatasetGateway(mockData);
const createDatasetProject = CreateDatasetProjectService(datasetGateway);
const getDatasetProject = GetDatasetProjectService(datasetGateway);
const getDataset = GetDatasetService(datasetGateway);
const renderPage = RenderPage(
  createDatasetProject,
  getDataset,
  getDatasetProject
);

// App entrypoint - render a dummy page
renderPage();
