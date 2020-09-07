import { AuthenticationService } from 'datafixer/core/auth';
import { MockAuthenticationGateway } from 'datafixer/core/auth/impl/mock';
import { DatasetService } from 'datafixer/core/data';
import { RenderPage } from 'datafixer/frontend';
import { mockDatasetGateway } from './mock-data';

const datasetService = DatasetService(mockDatasetGateway);
const authenticationService = AuthenticationService(
  new MockAuthenticationGateway()
);

const renderPage = RenderPage({
  authenticationService,
  datasetService,
  window,
});

// App entrypoint - render a dummy page
renderPage();
