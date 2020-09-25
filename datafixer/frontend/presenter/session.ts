import { createEvent, createStore, Store } from 'effector';
import { fold } from 'fp-ts/Either';
import { pipe } from 'fp-ts/pipeable';

import {
  AuthenticationDetails,
  AuthenticationService,
  AuthenticationResult,
} from 'datafixer/services/authentication';

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

const persistSessionData = (
  localStorage: Storage,
  sessionData: SessionData
) => {
  localStorage.setItem(SESSION_TOKEN_KEY, JSON.stringify(sessionData));
};

const getLocalStorageSessionData = (localStorage: Storage) => {
  const keyValue = localStorage.getItem(SESSION_TOKEN_KEY);
  if (keyValue === null) {
    return anonymousSession;
  }
  const localAuthResult = JSON.parse(keyValue);
  if (localAuthResult === null) {
    return anonymousSession;
  }
  return localAuthResult as SessionData;
};

type Context = {
  authenticationService: AuthenticationService;
  localStorage: Storage;
};

export const SessionPresenter = ({
  authenticationService,
  localStorage,
}: Context) => {
  const setSessionData = createEvent<SessionData>();
  const sessionData: Store<SessionData> = createStore<SessionData>(
    getLocalStorageSessionData(localStorage)
  );
  sessionData.on(setSessionData, (_, sessionData: SessionData) => sessionData);

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
        persistSessionData(localStorage, sessionData);
        setSessionData(sessionData);
      });
  };

  const logOut = () => {
    const data = sessionData.getState();
    if (data.sessionToken === null) {
      return;
    }
    authenticationService
      .logOut(data.sessionToken)
      .then(either =>
        pipe(
          either,
          fold(
            (error: Error) => {
              console.error('Error closing session', error);
              return data;
            },
            () => null
          )
        )
      )
      .then(data => {
        persistSessionData(localStorage, data || anonymousSession);
        setSessionData(data || anonymousSession);
      });
  };

  return { data: sessionData, logIn, logOut };
};
export type SessionPresenter = ReturnType<typeof SessionPresenter>;
