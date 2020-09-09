import express from 'express';

import { AuthenticationService } from 'datafixer/core/authentication';
import { DatasetService } from 'datafixer/core/data';
import {
  Location,
  getUrl,
  parseLocation,
  LocationService,
} from 'datafixer/core/routes';
import { renderToString } from 'datafixer/frontend';

import { ServerLocationGateway } from './location-gateway';

type ServerContext = {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
  localStorage: Storage;
};

const RenderHtmlService = (ctx: ServerContext) => (location: Location) => {
  return renderToString({
    ...ctx,
    locationService: new LocationService({
      locationGateway: new ServerLocationGateway(getUrl(location)),
    }),
  });
};

export const ServerService = (ctx: ServerContext) => (port: number) => {
  const expressRouter = express.Router();

  const renderHtml = RenderHtmlService(ctx);

  expressRouter.get('*', (req, res) => {
    const location = parseLocation(req.originalUrl);
    const html = `
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>10x Data Fixer Prototype</title>
    <link rel="stylesheet" href="/datafixer/frontend/bundle.min.css" />
  </head>
  <body>
    <div id="root">${renderHtml(location)}</div>
    <script src="/datafixer/context/browser/bundle.min.js"></script>
  </body>
</html>
`;
    res.send(html);
  });

  const app = express();

  // TODO: Map just required files rather than entire context/server sandbox.
  app.use(express.static('..'));
  app.use(expressRouter);

  app.listen(port, () => console.log(`Server listening on port ${port}.`));
};
