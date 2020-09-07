import React from 'react';
import { render } from 'react-dom';
import 'uswds';

import { AuthenticationService } from 'datafixer/core/auth';
import { DatasetService } from 'datafixer/core/data';

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
  window: Window;
};

const App = (ctx: AppContext) => {
  const router = useLocation();
  const session = useSession(ctx.authenticationService);

  let pageComponent: JSX.Element;
  switch (router.currentLocation.type) {
    case 'Home':
      pageComponent = (
        <Home
          ctx={{
            getFeaturedProjects: ctx.datasetService.getFeaturedProjects,
            resetFactoryDefaults: ctx.datasetService.resetFactoryDefaults,
            router: router,
            window: window,
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

export const RenderPage = (ctx: AppContext) => () => {
  return render(<App {...ctx} />, document.getElementById('root'));
};
