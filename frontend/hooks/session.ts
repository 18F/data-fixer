import { fold, left } from 'fp-ts/Either';
import { pipe } from 'fp-ts/pipeable';

import { useState } from 'react';

import {
  AuthenticationDetails,
  AuthenticationService,
  SessionToken,
} from 'datafixer/core/auth';

const SESSION_TOKEN_KEY = 'sessionToken';

const persistSessionToken = (sessionToken: SessionToken | null) => {
  if (sessionToken === null) {
    window.localStorage.removeItem(SESSION_TOKEN_KEY);
  } else {
    window.localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
  }
};

export const useSession = (
  authenticationService: AuthenticationService
): [SessionToken | null, (authenticationDetails: any) => void, () => void] => {
  const [sessionToken, logInToken] = useState<SessionToken | null>(null);

  // Initialize state with value from local storage, if set.
  const localSessionToken = window.localStorage.getItem(SESSION_TOKEN_KEY);
  if (localSessionToken !== sessionToken) {
    logInToken(localSessionToken);
  }

  const logIn = (authenticationDetails: AuthenticationDetails) => {
    authenticationService
      .logIn(authenticationDetails)
      .then(either =>
        pipe(
          either,
          fold(
            (error: Error) => {
              console.error('Error logging in', error);
              return null;
            },
            (sessionToken: SessionToken) => sessionToken
          )
        )
      )
      .then(token => {
        persistSessionToken(token);
        logInToken(token);
      });
  };

  const logOut = () => {
    if (sessionToken === null) {
      return;
    }
    authenticationService
      .logOut(sessionToken)
      .then(either =>
        pipe(
          either,
          fold(
            (error: Error) => {
              console.error('Error closing session', error);
              return sessionToken;
            },
            () => null
          )
        )
      )
      .then(token => {
        persistSessionToken(token);
        logInToken(token);
      });
  };

  return [sessionToken, logIn, logOut];
};
