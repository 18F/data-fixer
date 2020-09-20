import { createDomain, Effect, Store } from 'effector';

import {
  CreateDatasetProjectService,
  GetOrganizationsService,
  Organization,
} from 'datafixer/core/data';
import { projectLocation, UpdateLocation } from 'datafixer/core/routes';

export type Context = {
  createDatasetProject: CreateDatasetProjectService;
  getOrganizations: GetOrganizationsService;
  updateLocation: UpdateLocation;
};

export const ProjectCreatePresenter = ({
  createDatasetProject,
  getOrganizations,
  updateLocation,
}: Context) => {
  const domain = createDomain('create project');

  const getOrganizationsEffect = domain.effect<void, Organization[], Error>({
    handler: getOrganizations,
  });

  const organizations: Store<Organization[]> = domain
    .store<Organization[]>([])
    .on(getOrganizationsEffect.done, (_, { result }) => result);

  // Initiate organization list retrieval
  getOrganizationsEffect();

  const createProject: Effect<
    Parameters<typeof createDatasetProject>,
    void,
    Error
  > = domain.effect({
    handler: async (...args) => {
      console.log(args);
      //const project = await createDatasetProject(args[0], args[1], args[2]);
      //console.log(project);
      //updateLocation(
      //  projectLocation(project.organization.alias, project.alias)
      //);
    },
  });

  return {
    createProject,
    organizations,
  };
};
export type ProjectCreatePresenter = ReturnType<typeof ProjectCreatePresenter>;
