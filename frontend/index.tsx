import React, { useState } from 'react';
import { render } from 'react-dom';
import 'uswds';

import { GetDatasetService } from 'datafixer/core/services';

import { Banner } from './components/banner';
import { DatasetPage } from './components/dataset';
import { Footer } from './components/footer';
import {
  datasetLocation,
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

const App = (props: { getDataset: GetDatasetService }) => {
  const [location, updateLocation] = useLocation();

  let pageComponent: JSX.Element;
  switch (location.type) {
    case 'Home':
      pageComponent = (
        <div>
          <Link to={datasetLocation('id1v1')} updateLocation={updateLocation}>
            Dataset id1
          </Link>
        </div>
      );
      break;
    case 'Dataset':
      pageComponent = (
        <DatasetPage
          getDataset={props.getDataset}
          datasetId={location.datasetId}
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

export const RenderPage = (getDataset: GetDatasetService) => () => {
  return render(
    <App getDataset={getDataset} />,
    document.getElementById('root')
  );
};
