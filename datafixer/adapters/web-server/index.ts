import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';

import { SinglePageLocationGateway } from 'datafixer/adapters/location/single-page';
import { renderToString } from 'datafixer/frontend';
import { AuthenticationService } from 'datafixer/services/authentication';
import { DatasetService } from 'datafixer/services/dataset';
import {
  Location,
  getUrl,
  parseLocation,
  LocationService,
} from 'datafixer/services/routes';
import { UsePassport, LoginGovKey } from './passport';
import { SessionContext, UseSession } from './sessions';

type ServerContext = {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
  localStorage: Storage;
  loginGov: LoginGovKey;
  session: SessionContext;
};

const RenderHtmlService = (ctx: ServerContext) => async (
  location: Location
) => {
  return renderToString({
    ...ctx,
    locationService: new LocationService({
      locationGateway: new SinglePageLocationGateway(getUrl(location)),
    }),
  });
};

export const ServerService = (ctx: ServerContext) => {
  const renderHtml = RenderHtmlService(ctx);
  const usePassport = UsePassport({
    authenticationService: ctx.authenticationService,
    loginGov: ctx.loginGov,
  });
  const useSession = UseSession(ctx.session);

  return (port: number) => {
    const router = express.Router();

    const app = express();

    /**
     * Register middlewares
     */
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    // TODO: Map just required files rather than entire context/server sandbox.
    app.use(express.static('..'));

    // Wire up session management.
    useSession(app);

    // Wire up passport for authentication.
    usePassport(app);

    router.get('*', (req, res) => {
      const location = parseLocation(req.originalUrl);
      const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>10x Data Fixer Prototype</title>
    <link rel="stylesheet" href="/datafixer/datafixer/frontend/bundle.min.css" />
  </head>
  <body>
    <div id="root">${renderHtml(location)}</div>
    <script src="/datafixer/datafixer/context/browser/bundle.min.js"></script>
  </body>
</html>
`;
      const status = location.type === 'NotFound' ? 404 : 200;
      res.status(status);
      res.send(html);
    });

    app.use(router);
    app.listen(port, () => console.log(`Server listening on port ${port}.`));
  };
};
