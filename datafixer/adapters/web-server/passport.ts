import fs from 'fs';

import { AuthenticationService } from 'datafixer/services/authentication';
import { Express } from 'express';
import { JSONWebKey } from 'jose';
import {
  generators,
  Issuer,
  Strategy,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import passport from 'passport';

export type LoginGovKey = {
  jwkKey: JSONWebKey;
  oidcDiscoverUrl: string;
  clientId: string;
};

const LOGIN_GOV_STRATEGY_PARAMS = {
  redirect_uri: 'http://localhost:8080/openid-connect-login',
  scope: 'openid profile email phone address',
  response: ['userinfo'],
  nonce: generators.nonce(),
  acr_values: 'http://idmanagement.gov/ns/assurance/ial/1',
};

type PassportContext = {
  authenticationService: AuthenticationService;
  loginGov: LoginGovKey;
};

export const UsePassport = (ctx: PassportContext) => (app: Express) => {
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  Issuer.discover(ctx.loginGov.oidcDiscoverUrl)
    .then(myIssuer => {
      const oidcClient = new myIssuer.Client(
        {
          client_id: ctx.loginGov.clientId,
          token_endpoint_auth_method: 'private_key_jwt',
          acr_values: 'asdf',
        },
        {
          keys: [ctx.loginGov.jwkKey],
        }
      );

      // create a strategy along with the function that processes the results
      passport.use(
        'oidc',
        new Strategy(
          { client: oidcClient, params: LOGIN_GOV_STRATEGY_PARAMS },
          (
            _: TokenSet,
            userInfo: UserinfoResponse,
            done: (err: any, user?: any) => void
          ) => {
            if (!userInfo.email || !userInfo.email_verified) {
              return done(null, false);
            }

            ctx.authenticationService
              .logIn({
                emailAddress: userInfo.email,
              })
              .then(authenticationResult => {
                if (!authenticationResult) {
                  return done(null, false);
                }
                // Return the user. For now, just pass the userinfo object on.
                return done(null, userInfo);
              });
          }
        )
      );
    })
    .catch(err => {
      console.log('Error in OIDC setup', err);
    });

  // Wire up login route
  app.get('/login', passport.authenticate('oidc'));

  // OIDC Callback
  app.get(
    '/openid-connect-login',
    passport.authenticate('oidc', {
      successRedirect: '/',
      failureRedirect: '/',
    })
  );

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};
