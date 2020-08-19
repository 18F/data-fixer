import React, { useState } from 'react';

import { Dataset, DatasetId } from 'datafixer/core/entities';
import { GetDatasetService } from 'datafixer/core/services';

import { DataTable } from './data-table';
import { Link } from './link';
import { datasetLocation, datasetProjectLocation, Location } from '../routes';

export const DatasetPage = ({
  datasetId,
  getDataset,
  updateLocation,
}: {
  datasetId: DatasetId;
  getDataset: GetDatasetService;
  updateLocation: (location: Location) => void;
}) => {
  const [dataset, setDataset] = useState<Dataset | undefined>();
  getDataset(datasetId).then(dataset => {
    return setDataset(dataset);
  });

  if (!dataset) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link
        to={datasetProjectLocation(dataset.projectId)}
        updateLocation={updateLocation}
      >
        &lt; Back to project {dataset.projectId}
      </Link>
      <div className="grid-row">
        <div className="grid-col-12 mobile-lg:grid-col-4">
          <figure>
            <figcaption>Data sources</figcaption>
            <ul className="usa-list">
              {dataset.sources.map(datasetId => (
                <li key={datasetId}>
                  <Link
                    to={datasetLocation(datasetId)}
                    updateLocation={updateLocation}
                  >
                    {datasetId}
                  </Link>
                </li>
              ))}
            </ul>
          </figure>
        </div>
        <div className="grid-col-12 mobile-lg:grid-col-4">
          <figure>
            <figcaption>Data consumers</figcaption>
            <ul className="usa-list">
              {dataset.consumers.map(datasetId => (
                <li key={datasetId}>
                  <Link
                    to={datasetLocation(datasetId)}
                    updateLocation={updateLocation}
                  >
                    {datasetId}
                  </Link>
                </li>
              ))}
            </ul>
          </figure>
        </div>
        <div className="grid-col-12 mobile-lg:grid-col-4">
          <div>
            <dl>
              <dt>Schema type</dt>
              <dd>{dataset.schema.type}</dd>
            </dl>
            <code>{dataset.schema.description}</code>
          </div>
        </div>
      </div>
      <div className="grid-row">
        <DataTable caption="Browse this data" table={dataset.data} />
      </div>
    </>
  );
};
