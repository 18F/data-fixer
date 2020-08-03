import { RenderPage } from 'datafixer/frontend';
import { getMockDataSetGateway } from 'datafixer/core/gateways';
import { GetDataSetService } from 'datafixer/core/services';

const mockData = {
  id1: {},
  id2: {},
  id3: {},
};

const getDataSet = GetDataSetService(getMockDataSetGateway(mockData));
const renderPage = RenderPage(getDataSet);

// App entrypoint - render a dummy page
renderPage();
