import { createEffect, createStore, Effect, Store } from 'effector';

import {
  CreateDatasetProjectService,
  GetOrganizationsService,
  Organization,
} from 'datafixer/core/data';

export type Context = {
  createDatasetProject: CreateDatasetProjectService;
  getOrganizations: GetOrganizationsService;
};

export const ProjectCreatePresenter = ({
  createDatasetProject,
  getOrganizations,
}: Context) => {
  const getOrganizationsEffect = createEffect<void, Organization[], Error>({
    handler: getOrganizations,
  });

  const organizations: Store<Organization[]> = createStore<Organization[]>(
    []
  ).on(getOrganizationsEffect.done, (_, { result }) => result);

  // Initiate organization list retrieval
  getOrganizationsEffect();

  const createProject: Effect<
    Parameters<typeof createDatasetProject>,
    void,
    Error
  > = createEffect({
    handler: async (...args: any[]) => {
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
