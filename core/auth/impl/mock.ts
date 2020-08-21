import { AuthenticationDetails, AuthenticationGateway, SessionToken } from '..';
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
  ): Promise<Either<Error, SessionToken>> {
    return tryCatch<Error, SessionToken>(
      () => {
        window.localStorage.setItem(`mockSession-${MOCK_TOKEN}`, 'true');
        return Promise.resolve(MOCK_TOKEN);
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
