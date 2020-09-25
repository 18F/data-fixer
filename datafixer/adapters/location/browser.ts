import { SimpleEvent } from 'datafixer/core/util/simple-event';
import { LocationGateway } from 'datafixer/services/routes';

type BrowserLocationGatewayContext = {
  window: globalThis.Window;
};

export class BrowserLocationGateway implements LocationGateway {
  public readonly changeEvent = SimpleEvent(this);

  constructor(private ctx: BrowserLocationGatewayContext) {
    this.ctx.window.addEventListener('popstate', () => {
      this.changeEvent.trigger(this.getPath());
    });
  }

  getPath() {
    return this.ctx.window.location.pathname;
  }

  setPath(path: string) {
    this.ctx.window.history.pushState(null, '', path);
  }

  reload() {
    this.ctx.window.location.reload();
  }
}
