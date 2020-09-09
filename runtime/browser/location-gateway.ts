import { LocationGateway } from 'datafixer/core/routes';

type BrowserLocationGatewayContext = {
  location: globalThis.Location;
  history: globalThis.History;
};

export class BrowserLocationGateway implements LocationGateway {
  constructor(private ctx: BrowserLocationGatewayContext) {}

  getPath() {
    return this.ctx.location.pathname;
  }

  setPath(path: string) {
    this.ctx.history.pushState(null, '', path);
  }

  reload() {
    this.ctx.location.reload();
  }
}
