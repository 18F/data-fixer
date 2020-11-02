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

  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw Error('Expected SESSION_SECRET environment variable');
  }
  if (!process.env.LOGIN_GOV_JWK_FULL) {
    throw Error('Expected LOGIN_GOV_JWK_FULL environment variable');
  }
  const loginGovJwkFull = JSON.parse(process.env.LOGIN_GOV_JWK_FULL);

  return {
    authenticationService,
    datasetService,
    localStorage,
    sessionSecret,
    loginGov: {
      jwkKey: loginGovJwkFull,
      oidcDiscoverUrl:
        'https://idp.int.identitysandbox.gov/.well-known/openid-configuration',
      clientId: 'urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:datafixer',
    },
  };
};

const ctx = Context();
const server = ServerService(ctx);

console.log('Starting server');
server(8080);
