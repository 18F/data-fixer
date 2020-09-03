import React from 'react';

import { GetDatasetProjectService } from 'datafixer/core/data';

import { DatasetLayout } from './dataset-layout';
import { useDatasetProject } from '../hooks/dataset-project';
import { ProjectLocation, Location } from '../routes';

export const DatasetProjectPage = ({
  getDatasetProject,
  location,
  updateLocation,
}: {
  getDatasetProject: GetDatasetProjectService;
  location: ProjectLocation;
  updateLocation: (location: Location) => void;
}) => {
  const datasetProject = useDatasetProject(
    location.organizationAlias,
    location.alias,
    getDatasetProject
  );

  if (!datasetProject) {
    return <div>Loading...</div>;
  }

  return (
    <DatasetLayout
      datasetProject={datasetProject}
      currentId={datasetProject.id}
      location={location}
      updateLocation={updateLocation}
    >
      <h1>{datasetProject.details.title}</h1>
      <h2>{datasetProject.details.source}</h2>
      <p>{datasetProject.details.description}</p>
    </DatasetLayout>
  );
};
