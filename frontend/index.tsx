import React, { useState } from 'react';
import { render } from 'react-dom';
import 'uswds';

import {
  CreateDatasetProjectService,
  GetDatasetService,
  GetDatasetProjectService,
} from 'datafixer/core/services';

import { Banner } from './components/banner';
import { DatasetPage } from './components/dataset';
import { DatasetProjectPage } from './components/dataset-project';
import { Footer } from './components/footer';
import {
  datasetProjectLocation,
  home,
  parseLocation,
  getUrl,
  Location,
} from './routes';
import { Link } from './components/link';

export const useLocation = (): [Location, (location: Location) => void] => {
  const [location, setRoute] = useState<Location>(
    parseLocation(window.location.pathname)
  );

  const updateLocation = (newLocation: Location) => {
    setRoute(newLocation);
    window.history.pushState(null, '', getUrl(newLocation));
  };

  window.addEventListener('popstate', () => {
    setRoute(parseLocation(window.location.pathname));
  });

  return [location, updateLocation];
};

const App = ({
  createDatasetProject,
  getDataset,
  getDatasetProject,
}: {
  createDatasetProject: CreateDatasetProjectService;
  getDataset: GetDatasetService;
  getDatasetProject: GetDatasetProjectService;
}) => {
  const [location, updateLocation] = useLocation();

  let pageComponent: JSX.Element;
  switch (location.type) {
    case 'Home':
      pageComponent = (
        <div>
          <Link
            to={datasetProjectLocation('a897f990-9e1b-428c-bf63-4585290a947e')}
            updateLocation={updateLocation}
          >
            Dataset id1
          </Link>
        </div>
      );
      break;
    case 'Dataset':
      pageComponent = (
        <DatasetPage
          getDataset={getDataset}
          datasetId={location.datasetId}
          updateLocation={updateLocation}
        />
      );
      break;
    case 'DatasetProject':
      pageComponent = (
        <DatasetProjectPage
          getDatasetProject={getDatasetProject}
          datasetProjectId={location.datasetProjectId}
          updateLocation={updateLocation}
        />
      );
      break;
    case 'NotFound':
      pageComponent = <div>Page not found</div>;
  }

  return (
    <>
      <Banner />
      <div className="grid-container">
        <nav>
          <Link to={home} updateLocation={updateLocation}>
            Home
          </Link>
        </nav>
        {pageComponent}
      </div>
      <Footer />
    </>
  );
};

export const RenderPage = (
  createDatasetProject: CreateDatasetProjectService,
  getDataset: GetDatasetService,
  getDatasetProject: GetDatasetProjectService
) => () => {
  return render(
    <App
      createDatasetProject={createDatasetProject}
      getDataset={getDataset}
      getDatasetProject={getDatasetProject}
    />,
    document.getElementById('root')
  );
};
