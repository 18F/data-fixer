import React from 'react';

import { GetDatasetProjectService } from 'datafixer/core/data';

import { DatasetLayout } from './dataset-layout';
import { Link } from '../components/link';
import { useDatasetProject } from '../hooks/dataset-project';
import { newDataset, ProjectLocation, Location } from '../routes';

type DatasetProjectPageContext = {
  getDatasetProject: GetDatasetProjectService;
  updateLocation: (location: Location) => void;
};

export const DatasetProjectPage = (props: {
  ctx: DatasetProjectPageContext;
  location: ProjectLocation;
}) => {
  const datasetProject = useDatasetProject(
    props.location.organizationAlias,
    props.location.alias,
    props.ctx.getDatasetProject
  );

  if (!datasetProject) {
    return <div>Loading...</div>;
  }

  return (
    <DatasetLayout
      datasetProject={datasetProject}
      currentId={datasetProject.id}
      location={props.location}
      updateLocation={props.ctx.updateLocation}
    >
      <h1>{datasetProject.details.title}</h1>
      <h2>{datasetProject.details.source}</h2>
      <p>{datasetProject.details.description}</p>
      <Link
        to={newDataset(props.location.organizationAlias, props.location.alias)}
        updateLocation={props.ctx.updateLocation}
      >
        Upload New Dataset
      </Link>
    </DatasetLayout>
  );
};
