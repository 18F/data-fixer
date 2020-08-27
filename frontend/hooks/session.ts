import { fold, left } from 'fp-ts/Either';
import { pipe } from 'fp-ts/pipeable';

import { useState } from 'react';

import {
  AuthenticationDetails,
  AuthenticationService,
  AuthenticationResult,
} from 'datafixer/core/auth';

const SESSION_TOKEN_KEY = 'sessionToken';

// This mimicks the shape of AuthenticationResult, with a null sessionToken.
const anonymousSession = {
  sessionToken: null,
  userDetails: {
    displayName: 'Anonymous User',
  },
};

export type SessionData = AuthenticationResult | typeof anonymousSession;

export type SessionHook = {
  data: SessionData;
  logIn: (authenticationDetails: any) => void;
  logOut: () => void;
};

const persistSessionData = (sessionData: SessionData) => {
  window.localStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(sessionData));
};

const getLocalStorageSessionData = () => {
  const keyValue = window.localStorage.getItem(SESSION_TOKEN_KEY);
  if (keyValue === null) {
    return anonymousSession;
  }
  const localAuthResult = JSON.parse(keyValue);
  if (localAuthResult === null) {
    return anonymousSession;
  }
  return localAuthResult as SessionData;
};

export const useSession = (
  authenticationService: AuthenticationService
): SessionHook => {
  const [sessionData, setSessionData] = useState<SessionData>(
    getLocalStorageSessionData()
  );

  const logIn = (authenticationDetails: AuthenticationDetails) => {
    authenticationService
      .logIn(authenticationDetails)
      .then(either =>
        pipe(
          either,
          fold(
            (error: Error) => {
              console.error('Error logging in', error);
              return anonymousSession;
            },
            (sessionData: SessionData) => sessionData
          )
        )
      )
      .then(sessionData => {
        persistSessionData(sessionData);
        setSessionData(sessionData);
      });
  };

  const logOut = () => {
    if (sessionData.sessionToken === null) {
      return;
    }
    authenticationService
      .logOut(sessionData.sessionToken)
      .then(either =>
        pipe(
          either,
          fold(
            (error: Error) => {
              console.error('Error closing session', error);
              return sessionData;
            },
            () => null
          )
        )
      )
      .then(sessionData => {
        persistSessionData(sessionData || anonymousSession);
        setSessionData(sessionData || anonymousSession);
      });
  };

  return { data: sessionData, logIn, logOut };
};
