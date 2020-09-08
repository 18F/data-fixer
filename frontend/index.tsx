import React, { DOMElement } from 'react';
import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { AuthenticationService } from 'datafixer/core/authentication';
import { DatasetService } from 'datafixer/core/data';
import { LocationService } from 'datafixer/core/routes';

import { Home } from './components/home';
import { Layout } from './components/layout';
import { useSession } from './hooks/session';
import { DatasetPage } from './pages/dataset';
import { DatasetUploadPage } from './pages/dataset-upload';
import { DatasetProjectPage } from './pages/dataset-project';
import { NewDatasetProjectPage } from './pages/dataset-project-new';
import { OrganizationPage } from './pages/organization';
import { useLocation } from './hooks/location';

type AppContext = {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
  locationService: LocationService;
  localStorage: Storage;
};

export const App = ({ ctx }: { ctx: AppContext }) => {
  const router = useLocation({ locationService: ctx.locationService });
  const session = useSession(ctx.authenticationService, ctx.localStorage);

  let pageComponent: JSX.Element;
  switch (router.currentLocation.type) {
    case 'Home':
      pageComponent = (
        <Home
          ctx={{
            getFeaturedProjects: ctx.datasetService.getFeaturedProjects,
            locationService: ctx.locationService,
            resetFactoryDefaults: ctx.datasetService.resetFactoryDefaults,
            router: router,
          }}
        />
      );
      break;
    case 'NewProject':
      pageComponent = (
        <NewDatasetProjectPage
          ctx={{
            createDatasetProject: ctx.datasetService.createDatasetProject,
            getOrganizations: ctx.datasetService.getOrganizations,
            updateLocation: router.updateLocation,
          }}
        />
      );
      break;
    case 'Organization':
      pageComponent = (
        <OrganizationPage
          ctx={{
            createDatasetProject: ctx.datasetService.createDatasetProject,
            getOrganization: ctx.datasetService.getOrganization,
          }}
          location={router.currentLocation}
        />
      );
      break;
    case 'Dataset':
      pageComponent = (
        <DatasetPage
          ctx={{
            getDataset: ctx.datasetService.getDataset,
            getDatasetProject: ctx.datasetService.getDatasetProject,
            updateLocation: router.updateLocation,
          }}
          location={router.currentLocation}
        />
      );
      break;
    case 'NewDataset':
      pageComponent = <DatasetUploadPage />;
      break;
    case 'Project':
      pageComponent = (
        <DatasetProjectPage
          ctx={{
            getDatasetProject: ctx.datasetService.getDatasetProject,
            updateLocation: router.updateLocation,
          }}
          location={router.currentLocation}
        />
      );
      break;
    case 'NotFound':
      pageComponent = <div>Page not found</div>;
      break;
  }

  return (
    <Layout ctx={{ updateLocation: router.updateLocation }} session={session}>
      {pageComponent}
    </Layout>
  );
};

export const renderApp = (ctx: AppContext, element: HTMLElement) => {
  render(<App ctx={ctx} />, element);
};

export const renderToString = (ctx: AppContext) => {
  return ReactDOMServer.renderToString(<App ctx={ctx} />);
};
