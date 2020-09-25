import React from 'react';

import { DatasetProject, ProjectId, DatasetId } from 'datafixer/core';
import {
  datasetLocation,
  projectLocation,
  DatasetLocation,
  Location,
  ProjectLocation,
} from 'datafixer/services/routes';

import { Link } from '../components/link';

type DatasetLayoutContext = {
  datasetProject: DatasetProject;
  updateLocation: (location: Location) => void;
};

export const DatasetLayout = ({
  ctx,
  children,
  currentId,
  location,
}: {
  ctx: DatasetLayoutContext;
  children: React.ReactNode;
  currentId: DatasetId | ProjectId;
  location: DatasetLocation | ProjectLocation;
}) => {
  return (
    <div className="grid-row grid-gap-lg">
      <div className="tablet:grid-col-3">
        <nav aria-label="Secondary navigation">
          <ul className="usa-sidenav">
            <li className="usa-sidenav__item">
              <Link
                className={
                  currentId === ctx.datasetProject.id ? 'usa-current' : ''
                }
                to={projectLocation(location.organizationAlias, location.alias)}
                updateLocation={ctx.updateLocation}
              >
                {ctx.datasetProject.details.title}
              </Link>
            </li>
            <li className="usa-sidenav__item">
              <a>Dataset Versions</a>
              <ul className="usa-sidenav__sublist">
                {ctx.datasetProject.datasetVersions.map((datasetId, index) => (
                  <li key={datasetId} className={'usa-sidenav__item'}>
                    <Link
                      className={currentId === datasetId ? 'usa-current' : ''}
                      to={datasetLocation(
                        location.organizationAlias,
                        location.alias,
                        datasetId
                      )}
                      updateLocation={ctx.updateLocation}
                    >
                      Version {index + 1}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {ctx.datasetProject.source.type == 'aggregate' ? (
              <li className="usa-sidenav__item">
                <a>Sources</a>
                <ul className="usa-sidenav__sublist">
                  <ul className="usa-sidenav__sublist">
                    {ctx.datasetProject.source.projects.map(project => (
                      <li key={project.id} className="usa-sidenav__item">
                        <Link
                          to={projectLocation(
                            project.organization.alias,
                            project.alias
                          )}
                          updateLocation={ctx.updateLocation}
                        >
                          {project.organization.alias}/{project.alias}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </ul>
              </li>
            ) : null}
            {ctx.datasetProject.consumers.length > 0 && (
              <li className="usa-sidenav__item">
                <a>Data consumers</a>
                <ul className="usa-sidenav__sublist">
                  {ctx.datasetProject.consumers.map(project => (
                    <li key={project.id}>
                      <Link
                        to={projectLocation(
                          project.organization.alias,
                          project.alias
                        )}
                        updateLocation={ctx.updateLocation}
                      >
                        {project.organization.alias}/{project.alias}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="tablet:grid-col-9">{children}</div>
    </div>
  );
};
