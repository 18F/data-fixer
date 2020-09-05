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

const App = ({
  authenticationService,
  datasetService,
}: {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
}) => {
  const router = useLocation();
  const session = useSession(authenticationService);

  let pageComponent: JSX.Element;
  switch (router.currentLocation.type) {
    case 'Home':
      pageComponent = (
        <Home
          getFeaturedProjects={datasetService.getFeaturedProjects}
          resetFactoryDefaults={datasetService.resetFactoryDefaults}
          router={router}
        />
      );
      break;
    case 'NewProject':
      pageComponent = (
        <NewDatasetProjectPage
          createDatasetProject={datasetService.createDatasetProject}
          getOrganizations={datasetService.getOrganizations}
          updateLocation={router.updateLocation}
        />
      );
      break;
    case 'Organization':
      pageComponent = (
        <OrganizationPage
          createDatasetProject={datasetService.createDatasetProject}
          getOrganization={datasetService.getOrganization}
          location={router.currentLocation}
        />
      );
      break;
    case 'Dataset':
      pageComponent = (
        <DatasetPage
          getDataset={datasetService.getDataset}
          getDatasetProject={datasetService.getDatasetProject}
          location={router.currentLocation}
          updateLocation={router.updateLocation}
        />
      );
      break;
    case 'NewDataset':
      pageComponent = <DatasetUploadPage />;
      break;
    case 'Project':
      pageComponent = (
        <DatasetProjectPage
          getDatasetProject={datasetService.getDatasetProject}
          location={router.currentLocation}
          updateLocation={router.updateLocation}
        />
      );
      break;
    case 'NotFound':
      pageComponent = <div>Page not found</div>;
      break;
  }

  return (
    <Layout session={session} updateLocation={router.updateLocation}>
      {pageComponent}
    </Layout>
  );
};

export const RenderPage = (
  authenticationService: AuthenticationService,
  datasetService: DatasetService
) => () => {
  return render(
    <App
      authenticationService={authenticationService}
      datasetService={datasetService}
    />,
    document.getElementById('root')
  );
};
