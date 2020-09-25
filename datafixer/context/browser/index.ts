import 'uswds';

import { MockAuthenticationGateway } from 'datafixer/adapters/authentication/mock';
import { MockDatasetGateway } from 'datafixer/adapters/dataset/mock';
import { BrowserLocationGateway } from 'datafixer/adapters/location/browser';
import { renderApp } from 'datafixer/frontend';
import { AuthenticationService } from 'datafixer/services/authentication';
import { DatasetService } from 'datafixer/services/dataset';
import { LocationService } from 'datafixer/services/routes';

const Context = () => {
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

  return {
    authenticationService,
    datasetService,
    localStorage: window.localStorage,
    locationService: new LocationService({ locationGateway }),
  };
};

const element = document.getElementById('root');
if (element) {
  const ctx = Context();
  renderApp(ctx, element);
} else {
  console.error('no #root');
}
