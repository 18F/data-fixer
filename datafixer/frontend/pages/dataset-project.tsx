import React from 'react';

import {
  newDataset,
  ProjectLocation,
  Location,
} from 'datafixer/services/routes';

import { DatasetLayout } from './dataset-layout';
import { Link } from '../components/link';
import { DatasetProjectPresenter } from '../presenter/dataset-project';
import { useStore } from 'effector-react';

type DatasetProjectPageContext = {
  location: ProjectLocation;
  presenter: DatasetProjectPresenter;
  updateLocation: (location: Location) => void;
};

export const DatasetProjectPage = ({
  location,
  presenter,
  updateLocation,
}: DatasetProjectPageContext) => {
  presenter.init();

  const datasetProject = useStore(presenter.datasetProject);
  if (!datasetProject) {
    return <div>Loading...</div>;
  }

  return (
    <DatasetLayout
      ctx={{
        datasetProject: datasetProject,
        updateLocation: updateLocation,
      }}
      currentId={datasetProject.id}
      location={location}
    >
      <h1>{datasetProject.details.title}</h1>
      <h2>{datasetProject.details.source}</h2>
      <p>{datasetProject.details.description}</p>
      <Link
        to={presenter.getNewDatasetLocation()}
        updateLocation={updateLocation}
      >
        Upload New Dataset
      </Link>
    </DatasetLayout>
  );
};
