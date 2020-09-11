import 'uswds';

import { AuthenticationService } from 'datafixer/core/authentication';
import { DatasetService } from 'datafixer/core/data';
import { LocationService } from 'datafixer/core/routes';
import { renderApp } from 'datafixer/frontend';
import { BrowserLocationGateway } from 'datafixer/runtime/browser/location-gateway';
import { MockAuthenticationGateway } from 'datafixer/runtime/mock/authentication-gateway';
import { MockDatasetGateway } from 'datafixer/runtime/mock/dataset-gateway';

const mockDatasetGateway = new MockDatasetGateway({
  localStorage: window.localStorage,
});
const datasetService = DatasetService(mockDatasetGateway);
const authenticationService = AuthenticationService(
  new MockAuthenticationGateway({
    localStorage: window.localStorage,
  })
);

const locationGateway = new BrowserLocationGateway({ window });
const ctx = {
  authenticationService,
  datasetService,
  localStorage: window.localStorage,
  locationService: new LocationService({ locationGateway }),
};

const element = document.getElementById('root');
if (element) {
  renderApp(ctx, element);
} else {
  console.error('no #root');
}
