import { LocationGateway } from 'datafixer/core/routes';

export class BrowserLocationGateway implements LocationGateway {
  constructor(
    private ctx: { location: globalThis.Location; history: globalThis.History }
  ) {}

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
