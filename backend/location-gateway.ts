import { LocationGateway } from 'datafixer/core/routes';

export class ServerLocationGateway implements LocationGateway {
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
