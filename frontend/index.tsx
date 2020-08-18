import React, { useState } from 'react';
import { render } from 'react-dom';
import 'uswds';

import {
  CreateDatasetProjectService,
  GetDatasetProjectService,
} from 'datafixer/core/services';

import { Banner } from './components/banner';
import { DatasetPage } from './components/dataset';
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

const App = (props: {
  createDatasetProject: CreateDatasetProjectService;
  getDatasetProject: GetDatasetProjectService;
}) => {
  const [location, updateLocation] = useLocation();

  let pageComponent: JSX.Element;
  switch (location.type) {
    case 'Home':
      pageComponent = (
        <div>
          <Link
            to={datasetProjectLocation('3e66a3b2-aa96-4319-8a58-646126d9d793')}
            updateLocation={updateLocation}
          >
            Dataset id1
          </Link>
        </div>
      );
      break;
    case 'DatasetProject':
      pageComponent = (
        <DatasetPage
          getDatasetProject={props.getDatasetProject}
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
  getDatasetProject: GetDatasetProjectService
) => () => {
  return render(
    <App
      createDatasetProject={createDatasetProject}
      getDatasetProject={getDatasetProject}
    />,
    document.getElementById('root')
  );
};
