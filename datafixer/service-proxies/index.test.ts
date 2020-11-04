import { isLeft, right } from 'fp-ts/lib/Either';

import { DatasetProject } from 'datafixer/core';
import { GetDatasetProjectService } from 'datafixer/services/dataset';
import { projectLocation } from 'datafixer/services/routes';
import { ServiceProxyFactory } from 'datafixer/service-proxies/index';

describe('dataset project proxy', () => {
  it('typechecks', () => {
    // Define a function that we can typecheck a service against.
    const testFunction = (service: GetDatasetProjectService) => {
      service({
        organizationAlias: 'mndot',
        alias: 'road-closures',
      });
    };

    // Fetch spy to assert against when calling service proxy.
    const fetchSpy = jasmine
      .createSpy('fetch')
      .and.returnValue(Promise.resolve(right({ a: 1 })));

    const getServiceProxy = ServiceProxyFactory({ fetch: fetchSpy });

    const getDatasetProject = getServiceProxy<GetDatasetProjectService>({
      method: 'GET',
      getLocation: ({ organizationAlias, alias }) => {
        return projectLocation(organizationAlias, alias);
      },
      getBodyPayload: ({ organizationAlias, alias }) => {
        return {};
      },
      unpack: response => {
        const datasetProject = DatasetProject.decode(response);
        if (isLeft(datasetProject)) {
          return undefined;
        } else {
          return datasetProject.right;
        }
      },
    });

    // Service proxy conforms to the correct interface.
    getDatasetProject({
      organizationAlias: 'mndot',
      alias: 'road-closures',
    });
    expect(fetchSpy).toHaveBeenCalledWith('/mndot/road-closures', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });

    testFunction(getDatasetProject);

    // Fetch was called with expected arguments.
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
