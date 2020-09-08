import React, { useState } from 'react';

import {
  DatasetProject,
  GetDatasetProjectService,
  GetDatasetService,
} from 'datafixer/core/data';
import { DatasetLocation, Location } from 'datafixer/core/routes';

import { DataTable } from '../components/data-table';
import { useDataset } from '../hooks/dataset';
import { useDatasetProject } from '../hooks/dataset-project';
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
      ctx={{
        datasetProject: datasetProject,
        updateLocation: props.ctx.updateLocation,
      }}
      currentId={props.location.datasetId}
      location={props.location}
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
