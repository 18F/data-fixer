import React, { useState } from 'react';
import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { AuthenticationService } from 'datafixer/services/authentication';
import { DatasetService } from 'datafixer/services/dataset';
import { Location, LocationService, Router } from 'datafixer/services/routes';

import { Layout } from './components/layout';
import { DatasetPage } from './pages/dataset';
import { DatasetUploadPage } from './pages/dataset-upload';
import { DatasetProjectPage } from './pages/dataset-project';
import { NewDatasetProjectPage } from './pages/dataset-project-new';
import { Home } from './pages/home';
import { OrganizationPage } from './pages/organization';
import { Presenter } from './presenter';

type AppContext = {
  authenticationService: AuthenticationService;
  datasetService: DatasetService;
  locationService: LocationService;
  localStorage: Storage;
};

export const useLocation = (ctx: {
  locationService: LocationService;
}): Router => {
  const [currentLocation, setLocation] = useState<Location>(
    ctx.locationService.getLocation()
  );
  ctx.locationService.changeEvent.addListener(setLocation);

  const updateLocation = (newLocation: Location) => {
    ctx.locationService.setLocation(newLocation);
  };

  return { currentLocation, updateLocation };
};

export const App = ({
  ctx,
  presenter,
}: {
  ctx: AppContext;
  presenter: Presenter;
}) => {
  const router = useLocation({ locationService: ctx.locationService });

  let pageComponent: JSX.Element;
  switch (router.currentLocation.type) {
    case 'Home':
      pageComponent = (
        <Home
          presenter={presenter.home}
          ctx={{
            router: router,
          }}
        />
      );
      break;
    case 'NewProject':
      pageComponent = (
        <NewDatasetProjectPage presenter={presenter.newDatasetProject} />
      );
      break;
    case 'Organization':
      pageComponent = <OrganizationPage presenter={presenter.organization} />;
      break;
    case 'Dataset':
      pageComponent = (
        <DatasetPage
          location={router.currentLocation}
          presenter={presenter.dataset}
          updateLocation={router.updateLocation}
        />
      );
      break;
    case 'NewDataset':
      pageComponent = <DatasetUploadPage presenter={presenter.datasetUpload} />;
      break;
    case 'Project':
      pageComponent = (
        <DatasetProjectPage
          location={router.currentLocation}
          presenter={presenter.datasetProject}
          updateLocation={router.updateLocation}
        />
      );
      break;
    case 'NotFound':
      pageComponent = <div>Page not found</div>;
      break;
  }

  return (
    <Layout
      ctx={{ updateLocation: router.updateLocation }}
      session={presenter.session}
    >
      {pageComponent}
    </Layout>
  );
};

export const renderApp = (ctx: AppContext, element: HTMLElement) => {
  const presenter = Presenter(ctx);
  render(<App ctx={ctx} presenter={presenter} />, element);
};

export const renderToString = (ctx: AppContext) => {
  const presenter = Presenter(ctx);
  return ReactDOMServer.renderToString(<App ctx={ctx} presenter={presenter} />);
};
