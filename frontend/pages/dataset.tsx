import React, { useState } from 'react';

import {
  DatasetProject,
  GetDatasetProjectService,
  GetDatasetService,
} from 'datafixer/core/data';

import { DataTable } from '../components/data-table';
import { useDataset } from '../hooks/dataset';
import { useDatasetProject } from '../hooks/dataset-project';
import { DatasetLocation, Location } from '../routes';
import { DatasetLayout } from './dataset-layout';

type DatasetPageContext = {
  getDataset: GetDatasetService;
  getDatasetProject: GetDatasetProjectService;
  updateLocation: (location: Location) => void;
};

export const DatasetPage = (props: {
  ctx: DatasetPageContext;
  location: DatasetLocation;
}) => {
  const dataset = useDataset(props.location.datasetId, props.ctx.getDataset);
  const datasetProject = useDatasetProject(
    props.location.organizationAlias,
    props.location.alias,
    props.ctx.getDatasetProject
  );

  if (!dataset || !datasetProject) {
    return <div>Loading...</div>;
  }

  return (
    <DatasetLayout
      datasetProject={datasetProject}
      currentId={props.location.datasetId}
      location={props.location}
      updateLocation={props.ctx.updateLocation}
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
