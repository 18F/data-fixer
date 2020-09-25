import { useStore } from 'effector-react';
import React, { useEffect } from 'react';

import { projectLocation, Router } from 'datafixer/services/routes';

import { Link } from '../components/link';
import { HomePresenter } from '../presenter/home';

type HomeContext = {
  router: Router;
};

export const Home = ({
  ctx,
  presenter,
}: {
  ctx: HomeContext;
  presenter: HomePresenter;
}) => {
  const featuredProjects = useStore(presenter.featuredProjects);

  useEffect(() => {
    presenter.init();
  }, []);

  if (featuredProjects.length === 0) {
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
              presenter.resetFactoryDefaults();
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
