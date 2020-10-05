import { useStore } from 'effector-react';
import React from 'react';

import {
  datasetLocation,
  DatasetLocation,
  Location,
} from 'datafixer/services/routes';
import { DataTable } from '../components/data-table';
import { DatasetLayout } from './dataset-layout';
import { DatasetPresenter } from '../presenter/dataset';
import { Dataset } from 'datafixer/core';

type DatasetPageContext = {
  location: DatasetLocation;
  presenter: DatasetPresenter;
  updateLocation: (location: Location) => void;
};

const hasSuggestions = (rows: Dataset['data']) => {
  for (const row of rows) {
    for (const datum of row) {
      if (datum.value && datum.suggestion) {
        return true;
      }
    }
  }
  return false;
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
      {/*<figure>
        <figcaption>{dataset.schema.type}</figcaption>
        <code>{dataset.schema.description}</code>
      </figure>*/}
      <h1>{datasetProject.details.title}</h1>
      <p>{datasetProject.details.description}</p>
      {hasSuggestions(dataset.data) ? (
        <div className="usa-alert usa-alert--error">
          <div className="usa-alert__body">
            <h3 className="usa-alert__heading">Format type errors found</h3>
            <p className="usa-alert__text">
              Formatting errros were found in some of the data. They can be
              fixed by editing the data below or by clicking{' '}
              <a href="javascript:void">here</a>.
            </p>
          </div>
        </div>
      ) : null}
      <div className="grid-row">
        <p>
          <div>Uploaded 8/9/2020 11:00 AM CST</div>
          <div>
            <a href="javascript:void">View data validation settings</a>
          </div>
        </p>
      </div>
      <div className="grid-row">
        <DataTable caption="Browse this data" table={dataset.data} />
      </div>
    </DatasetLayout>
  );
};
