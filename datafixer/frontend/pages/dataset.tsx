import { useStore } from 'effector-react';
import React from 'react';

import { DatasetLocation, Location } from 'datafixer/core/routes';
import { DataTable } from '../components/data-table';
import { DatasetLayout } from './dataset-layout';
import { DatasetPresenter } from '../presenter/dataset';

type DatasetPageContext = {
  location: DatasetLocation;
  presenter: DatasetPresenter;
  updateLocation: (location: Location) => void;
};

export const DatasetPage = ({
  location,
  presenter,
  updateLocation,
}: DatasetPageContext) => {
  presenter.init();

  const dataset = useStore(presenter.dataset);
  const datasetProject = useStore(presenter.datasetProject);

  if (!dataset || !datasetProject) {
    return <div>Loading...</div>;
  }

  return (
    <DatasetLayout
      ctx={{
        datasetProject: datasetProject,
        updateLocation: updateLocation,
      }}
      currentId={location.datasetId}
      location={location}
    >
      <figure>
        <figcaption>{dataset.schema.type}</figcaption>
        <code>{dataset.schema.description}</code>
      </figure>
      <div className="grid-row">
        <DataTable caption="Browse this data" table={dataset.data} />
      </div>
    </DatasetLayout>
  );
};
