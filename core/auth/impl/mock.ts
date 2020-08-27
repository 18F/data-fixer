import {
  AuthenticationDetails,
  AuthenticationGateway,
  AuthenticationResult,
  SessionToken,
} from '..';
import { Either } from 'fp-ts/Either';
import { tryCatch } from 'fp-ts/TaskEither';

const MOCK_TOKEN: SessionToken = 'abc';

export class MockAuthenticationGateway implements AuthenticationGateway {
  isSessionActive(sessionToken: SessionToken): Promise<Either<Error, boolean>> {
    return tryCatch<Error, boolean>(
      () => {
        const item = window.localStorage.getItem(`mockSession-${sessionToken}`);
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
        window.localStorage.setItem(`mockSession-${MOCK_TOKEN}`, 'true');
        return Promise.resolve({
          sessionToken: MOCK_TOKEN,
          userDetails: {
            displayName: 'Mock User',
          },
        });
      },
      reason => new Error(String(reason))
    )();
  }

  closeSession(sessionToken: SessionToken): Promise<Either<Error, void>> {
    return tryCatch<Error, void>(
      () =>
        Promise.resolve(
          window.localStorage.removeItem(`mockSession-${sessionToken}`)
        ),
      reason => new Error(String(reason))
    )();
  }
}
