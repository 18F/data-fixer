import React from 'react';
import { render } from 'react-dom';
import 'uswds';

import { AuthenticationService } from 'datafixer/core/auth';
import { DatasetService } from 'datafixer/core/data';

import { DatasetPage } from './components/dataset';
import { DatasetProjectPage } from './components/dataset-project';
import { Home } from './components/home';
import { Layout } from './components/layout';
import { useLocation } from './hooks/location';
import { useSession } from './hooks/session';

const App = ({
  authenticationService,
  datasetService,
}: {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
}) => {
  const [location, updateLocation] = useLocation();
  const session = useSession(authenticationService);

  let pageComponent: JSX.Element;
  switch (location.type) {
    case 'Home':
      pageComponent = (
        <Home
          getFeaturedProjects={datasetService.getFeaturedProjects}
          resetFactoryDefaults={datasetService.resetFactoryDefaults}
          updateLocation={updateLocation}
        />
      );
      break;
    case 'Organization':
      pageComponent = <div>TODO: Organization page here</div>;
      break;
    case 'Dataset':
      pageComponent = (
        <DatasetPage
          getDataset={datasetService.getDataset}
          getDatasetProject={datasetService.getDatasetProject}
          location={location}
          updateLocation={updateLocation}
        />
      );
      break;
    case 'Project':
      pageComponent = (
        <DatasetProjectPage
          getDatasetProject={datasetService.getDatasetProject}
          location={location}
          updateLocation={updateLocation}
        />
      );
      break;
    case 'NotFound':
      pageComponent = <div>Page not found</div>;
      break;
  }

  return (
    <Layout session={session} updateLocation={updateLocation}>
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
