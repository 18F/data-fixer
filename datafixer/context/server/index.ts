import { LocalStorage } from 'node-localstorage';

import { MockAuthenticationGateway } from 'datafixer/adapters/authentication/mock';
import { MockDatasetGateway } from 'datafixer/adapters/dataset/mock';
import { ServerService } from 'datafixer/adapters/web-server';
import { AuthenticationService } from 'datafixer/services/authentication';
import { DatasetService } from 'datafixer/services/dataset';

const Context = () => {
  const localStorage = new LocalStorage('./scratch');
  const mockDatasetGateway = new MockDatasetGateway({ localStorage });
  const datasetService = DatasetService(mockDatasetGateway);
  const authenticationService = AuthenticationService(
    new MockAuthenticationGateway({ localStorage })
  );
  return {
    authenticationService,
    datasetService,
    localStorage,
  };
};

const ctx = Context();
const server = ServerService(ctx);

console.log('Starting server');
server(8080);
