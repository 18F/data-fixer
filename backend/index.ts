import express from 'express';

import { AuthenticationService } from 'datafixer/core/authentication';
import { DatasetService } from 'datafixer/core/data';
import {
  Location,
  getUrl,
  parseLocation,
  LocationGateway,
  LocationService,
} from 'datafixer/core/routes';
import { renderToString } from 'datafixer/frontend';

type ServerContext = {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
  localStorage: Storage;
};

class ServerLocationGateway implements LocationGateway {
  constructor(private path: string) {}
  getPath() {
    return this.path;
  }
  setPath(path: string) {
    throw new Error('Not implemented on the server');
  }
  reload() {
    throw new Error('Not implemented on the server');
  }
}

const RenderHtmlService = (ctx: ServerContext) => (location: Location) => {
  return renderToString({
    ...ctx,
    localStorage: ctx.localStorage,
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
    const html = renderHtml(location);
    res.send(html);
  });

  const app = express();
  app.use(expressRouter);
  app.listen(port, () => console.log(`Server listening on port ${port}.`));
};
