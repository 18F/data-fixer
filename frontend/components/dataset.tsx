import React, { useState } from 'react';

import { DatasetProject, DatasetProjectId } from 'datafixer/core/entities';
import { GetDatasetProjectService } from 'datafixer/core/services';

import { DataTable } from './data-table';
import { Link } from './link';
import { datasetProjectLocation, Location } from '../routes';

export const DatasetPage = ({
  datasetProjectId,
  getDatasetProject,
  updateLocation,
}: {
  datasetProjectId: DatasetProjectId;
  getDatasetProject: GetDatasetProjectService;
  updateLocation: (location: Location) => void;
}) => {
  const [datasetProject, setDatasetProject] = useState<
    DatasetProject | undefined
  >();
  getDatasetProject(datasetProjectId).then(project => {
    console.log('hi', project);
    return setDatasetProject(project);
  });

  if (!datasetProject) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid-container">
        <div className="grid-row">
          <div>
            <h1>{datasetProject.details.title}</h1>
            <em>
              Source: {datasetProject.source.type} / id: {datasetProject.id}
            </em>
            <p>{datasetProject.details.description}</p>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <figure>
              <figcaption>
                Dataset Versions
                {datasetProject.datasetVersions.length > 1 ? 's' : ''}
              </figcaption>
              <ul className="usa-list">
                {datasetProject.datasetVersions.map(version => (
                  <li key={version}>{version}</li>
                ))}
              </ul>
            </figure>
          </div>
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <figure>
              <figcaption>
                Data source type: {datasetProject.source.type}
              </figcaption>
              {datasetProject.source.type == 'aggregate' ? (
                <ul className="usa-list">
                  {datasetProject.source.projects.map(project => (
                    <li key={project.id}>
                      <Link
                        to={datasetProjectLocation(project.id)}
                        updateLocation={updateLocation}
                      >
                        {project.id}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </figure>
          </div>
          <div className="grid-col-12 mobile-lg:grid-col-4">
            <figure>
              <figcaption>Data consumer TODO</figcaption>
              <ul className="usa-list">
                <li>TODO</li>
              </ul>
            </figure>
          </div>
        </div>
        <div className="grid-row">
          <DataTable caption="Browse this data (TODO)" table={[]} />
        </div>
        <div className="grid-row">
          <div className="grid-col-6">
            <div>
              <dl>
                <dt>Schema type</dt>
                <dd>TODO</dd>
              </dl>
              <code>TODO</code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
