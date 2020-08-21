import React, { useState } from 'react';
import { render } from 'react-dom';
import 'uswds';

import { AuthenticationService } from 'datafixer/core/auth';
import { DatasetService } from 'datafixer/core/data';

import { DatasetPage } from './components/dataset';
import { DatasetProjectPage } from './components/dataset-project';
import { Layout } from './components/layout';
import { datasetProjectLocation } from './routes';
import { Link } from './components/link';
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
  const [sessionToken, logIn, logOut] = useSession(authenticationService);

  let pageComponent: JSX.Element;
  switch (location.type) {
    case 'Home':
      pageComponent = (
        <section className="grid-container usa-section usa-section--condensed border-top border-base-lightest">
          <p>
            Welcome to the <a href="https://10x.gsa.gov/">10x</a> Data Fixer
            prototype!
          </p>
          <p>
            You may interact with the application, and come back here to reset
            the application state:
          </p>
          <ul>
            <li>
              <button
                className="usa-button usa-button--unstyled"
                onClick={datasetService.resetFactoryDefaults}
              >
                Reset To Factory Defaults
              </button>
            </li>
          </ul>
          <p>
            To explore, here are initial dataset projects we have configured for
            sample purposes:
          </p>
          <ul>
            <li>
              <Link
                to={datasetProjectLocation(
                  'a897f990-9e1b-428c-bf63-4585290a947e'
                )}
                updateLocation={updateLocation}
              >
                DOT Aggregate Dataset
              </Link>
            </li>
          </ul>
        </section>
      );
      break;
    case 'Dataset':
      pageComponent = (
        <DatasetPage
          getDataset={datasetService.getDataset}
          datasetId={location.datasetId}
          updateLocation={updateLocation}
        />
      );
      break;
    case 'DatasetProject':
      pageComponent = (
        <DatasetProjectPage
          getDatasetProject={datasetService.getDatasetProject}
          datasetProjectId={location.datasetProjectId}
          updateLocation={updateLocation}
        />
      );
      break;
    case 'NotFound':
      pageComponent = <div>Page not found</div>;
  }

  return (
    <Layout
      logOut={logOut}
      sessionToken={sessionToken}
      logIn={logIn}
      updateLocation={updateLocation}
    >
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
