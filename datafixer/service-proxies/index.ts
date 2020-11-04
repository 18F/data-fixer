import { getUrl, Location } from 'datafixer/services/routes';

// Type to unpack resolve type of a promise.
type Await<T> = T extends PromiseLike<infer U> ? U : T;

type ServiceProxyFactoryContext = {
  fetch: typeof fetch;
};

export const ServiceProxyFactory = (ctx: ServiceProxyFactoryContext) => <
  Service extends (...args: any) => Promise<any>
>({
  method,
  getLocation,
  getBodyPayload,
  unpack,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  getLocation: (...args: Parameters<Service>) => Location;
  getBodyPayload: (...args: Parameters<Service>) => any;
  unpack: (response: any) => undefined | Await<ReturnType<Service>>;
}) => {
  return (...args: Parameters<Service>) => {
    const location = getLocation(...args);
    const url = getUrl(location);
    const payload = getBodyPayload(...args);
    return ctx
      .fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        return unpack(data);
      })
      .catch(error => {
        console.error('Error:', error);
        return undefined;
      });
  };
};
