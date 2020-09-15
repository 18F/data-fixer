import { LocalStorage } from 'node-localstorage';

import { ServerService } from 'datafixer/backend';
import { AuthenticationService } from 'datafixer/core/authentication';
import { DatasetService } from 'datafixer/core/data';
import { MockAuthenticationGateway } from 'datafixer/runtime/mock/authentication-gateway';
import { MockDatasetGateway } from 'datafixer/runtime/mock/dataset-gateway';

const localStorage = new LocalStorage('./scratch');
const mockDatasetGateway = new MockDatasetGateway({ localStorage });
const datasetService = DatasetService(mockDatasetGateway);
const authenticationService = AuthenticationService(
  new MockAuthenticationGateway({ localStorage })
);

const ctx = {
  authenticationService,
  datasetService,
  localStorage,
};

const server = ServerService(ctx);

console.log('Starting server');
server(8080);
