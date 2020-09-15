import { LocationGateway } from 'datafixer/core/routes';
import { SimpleEvent } from 'datafixer/core/util/simple-event';

export class ServerLocationGateway implements LocationGateway {
  public readonly changeEvent = SimpleEvent(this);
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
