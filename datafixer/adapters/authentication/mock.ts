import { Either } from 'fp-ts/Either';
import { tryCatch } from 'fp-ts/TaskEither';
import { v4 as uuidv4 } from 'uuid';

import {
  AuthenticationDetails,
  AuthenticationGateway,
  AuthenticationResult,
  SessionToken,
} from 'datafixer/services/authentication';

const MOCK_TOKEN: SessionToken = 'abc';

type MockAthenticationGatewayContext = {
  localStorage: Storage;
};

export class MockAuthenticationGateway implements AuthenticationGateway {
  constructor(private ctx: MockAthenticationGatewayContext) {}
  isSessionActive(sessionToken: SessionToken): Promise<Either<Error, boolean>> {
    return tryCatch<Error, boolean>(
      () => {
        const item = this.ctx.localStorage.getItem(
          `mockSession-${sessionToken}`
        );
        return Promise.resolve(item !== null);
      },
      reason => new Error(String(reason))
    )();
  }

  authenticate(
    authenticationDetails: AuthenticationDetails
  ): Promise<Either<Error, AuthenticationResult>> {
    return tryCatch<Error, AuthenticationResult>(
      () => {
        if (authenticationDetails.emailAddress.endsWith('@gsa.gov')) {
          return Promise.resolve({
            sessionToken: uuidv4(),
            userDetails: {
              displayName: 'Mock User',
            },
          });
        }
        return Promise.resolve(null);
      },
      reason => new Error(String(reason))
    )();
  }

  closeSession(sessionToken: SessionToken): Promise<Either<Error, void>> {
    return tryCatch<Error, void>(
      () =>
        Promise.resolve(
          this.ctx.localStorage.removeItem(`mockSession-${sessionToken}`)
        ),
      reason => new Error(String(reason))
    )();
  }
}
