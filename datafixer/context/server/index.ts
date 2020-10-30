import Knex from 'knex';
import { LocalStorage } from 'node-localstorage';

import { MockAuthenticationGateway } from 'datafixer/adapters/authentication/mock';
import { KnexDatasetGateway } from 'datafixer/adapters/dataset/knex';
import { ServerService } from 'datafixer/adapters/web-server';
import { AuthenticationService } from 'datafixer/services/authentication';
import { DatasetService } from 'datafixer/services/dataset';

const Context = () => {
  const localStorage = new LocalStorage('./scratch');
  const datasetGateway = new KnexDatasetGateway({
    db: Knex({
      client: 'sqlite3',
      connection: {
        filename: './dev.sqlite3',
      },
    }),
  });
  const datasetService = DatasetService(datasetGateway);
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
