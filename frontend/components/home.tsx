import React from 'react';

import {
  GetFeaturedProjectsService,
  ResetFactoryDefaultsService,
} from 'datafixer/core/data';
import {
  LocationService,
  projectLocation,
  Router,
} from 'datafixer/core/routes';

import { Link } from '../components/link';
import { useFeaturedProjects } from '../hooks/featured-projects';

type HomeContext = {
  getFeaturedProjects: GetFeaturedProjectsService;
  locationService: LocationService;
  resetFactoryDefaults: ResetFactoryDefaultsService;
  router: Router;
};

export const Home = ({ ctx }: { ctx: HomeContext }) => {
  const featuredProjects = useFeaturedProjects(ctx.getFeaturedProjects);

  if (!featuredProjects) {
    return <div>Loading...</div>;
  }

  return (
    <section className="grid-container usa-section usa-section--condensed border-top border-base-lightest">
      <p>
        Welcome to the <a href="https://10x.gsa.gov/">10x</a> Data Fixer
        prototype!
      </p>
      <p>
        You may interact with the application, and come back here to reset the
        application state:
      </p>
      <ul>
        <li>
          <button
            className="usa-button usa-button--unstyled"
            onClick={() => {
              ctx.resetFactoryDefaults();
              ctx.locationService.reload();
            }}
          >
            Reset To Factory Defaults
          </button>
        </li>
      </ul>
      <p>
        To explore, here are initial dataset projects we have configured for
        sample purposes:
      </p>
      <ul>
        {featuredProjects.map(project => (
          <li key={project.id}>
            <Link
              to={projectLocation(project.organization.alias, project.alias)}
              updateLocation={ctx.router.updateLocation}
            >
              {project.details.title}
            </Link>
            &nbsp;&mdash;&nbsp;
            {project.details.description}
          </li>
        ))}
      </ul>
    </section>
  );
};
