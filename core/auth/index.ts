import { Either } from 'fp-ts/Either';

// Placeholder types
export type SessionToken = string;
export type AuthenticationDetails = any;

export interface AuthenticationGateway {
  isSessionActive(sessionToken: SessionToken): Promise<Either<Error, boolean>>;
  authenticate(
    authenticationDetails: AuthenticationDetails
  ): Promise<Either<Error, SessionToken>>;
  closeSession(sessionToken: SessionToken): Promise<Either<Error, void>>;
}

export const LogInService = (authenticationGateway: AuthenticationGateway) => (
  authenticationDetails: AuthenticationDetails
) => {
  return authenticationGateway.authenticate(authenticationDetails);
};
export type LogInService = ReturnType<typeof LogInService>;

export const LogOutService = (authenticationGateway: AuthenticationGateway) => (
  sessionToken: SessionToken
) => {
  return authenticationGateway.closeSession(sessionToken);
};
export type LogOutService = ReturnType<typeof LogOutService>;

export const IsSessionActiveService = (
  authenticationGateway: AuthenticationGateway
) => (sessionToken: SessionToken) => {
  return authenticationGateway.isSessionActive(sessionToken);
};
export type IsSessionActiveService = ReturnType<typeof IsSessionActiveService>;

export const AuthenticationService = (
  authenticationGateway: AuthenticationGateway
) => {
  return {
    logIn: LogInService(authenticationGateway),
    logOut: LogOutService(authenticationGateway),
    isSessionActive: IsSessionActiveService(authenticationGateway),
  };
};
export type AuthenticationService = ReturnType<typeof AuthenticationService>;
