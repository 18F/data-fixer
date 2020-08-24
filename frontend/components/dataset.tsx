import React, { useState } from 'react';

import {
  DatasetProject,
  GetDatasetProjectService,
  GetDatasetService,
} from 'datafixer/core/data';

import { DataTable } from './data-table';
import { DatasetLayout } from './dataset-layout';
import { useDataset } from '../hooks/dataset';
import { useDatasetProject } from '../hooks/dataset-project';
import { DatasetLocation, Location } from '../routes';

export const DatasetPage = ({
  getDataset,
  getDatasetProject,
  location,
  updateLocation,
}: {
  getDataset: GetDatasetService;
  getDatasetProject: GetDatasetProjectService;
  location: DatasetLocation;
  updateLocation: (location: Location) => void;
}) => {
  const dataset = useDataset(location.datasetId, getDataset);
  const datasetProject = useDatasetProject(
    location.organizationAlias,
    location.alias,
    getDatasetProject
  );

  if (!dataset || !datasetProject) {
    return <div>Loading...</div>;
  }

  return (
    <DatasetLayout
      datasetProject={datasetProject}
      currentId={location.datasetId}
      location={location}
      updateLocation={updateLocation}
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
