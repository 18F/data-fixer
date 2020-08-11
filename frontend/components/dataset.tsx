import React, { useState } from 'react';

import { Dataset, DatasetId } from 'datafixer/core/entities';
import { GetDatasetService } from 'datafixer/core/services';

import { DataTable } from './data-table';
import { Link } from './link';
import { datasetLocation, Location } from '../routes';

export const DatasetPage = (props: {
  getDataset: GetDatasetService;
  datasetId: DatasetId;
  updateLocation: (updateLocation: Location) => void;
}) => {
  const [dataset, setDataset] = useState<Dataset | undefined>();
  props.getDataset(props.datasetId).then(setDataset);

  if (!dataset) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div>
            <h1>{dataset.title}</h1>
            <em>
              Source: {dataset.source}/ Last Modified: {dataset.lastModified}/
              id: {dataset.id}
            </em>
            <p>{dataset.description}</p>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <figure>
              <figcaption>
                Other version{dataset.versions.length > 1 ? 's' : ''}
              </figcaption>
              <ul className="usa-list">
                {dataset.versions.map(version => (
                  <li key={version}>
                    {dataset.id === version ? (
                      `Version ${version}`
                    ) : (
                      <Link
                        to={datasetLocation(version)}
                        updateLocation={props.updateLocation}
                      >
                        Version {version}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </figure>
          </div>
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <figure>
              <figcaption>
                Data source{dataset.sources.length > 1 ? 's' : ''}
              </figcaption>
              <ul className="usa-list">
                {dataset.sources.map(datasetId => (
                  <li key={datasetId}>
                    <Link
                      to={datasetLocation(datasetId)}
                      updateLocation={props.updateLocation}
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
              <figcaption>
                Data consumer{dataset.consumers.length > 1 ? 's' : ''}
              </figcaption>
              <ul className="usa-list">
                {dataset.consumers.map(datasetId => (
                  <li key={datasetId}>
                    <Link
                      to={datasetLocation(datasetId)}
                      updateLocation={props.updateLocation}
                    >
                      {datasetId}
                    </Link>
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </div>
        <div className="grid-row">
          <DataTable caption="Browse this data" table={dataset.table} />
        </div>
        <div className="grid-row">
          <div className="grid-col-6">
            <div>
              <dl>
                <dt>Schema type</dt>
                <dd>{dataset.schema.type}</dd>
              </dl>
              <code>{dataset.schema.description}</code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
