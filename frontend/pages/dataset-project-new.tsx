import React from 'react';

import {
  CreateDatasetProjectService,
  GetOrganizationsService,
} from 'datafixer/core/data';

import { Location } from '../routes';
import { CreateProjectForm } from '../components/dataset-project-create-form';

type NewDatasetProjectPageContext = {
  createDatasetProject: CreateDatasetProjectService;
  getOrganizations: GetOrganizationsService;
  updateLocation: (location: Location) => void;
};

export const NewDatasetProjectPage = ({
  ctx,
}: {
  ctx: NewDatasetProjectPageContext;
}) => (
  <CreateProjectForm
    ctx={{
      createDatasetProject: ctx.createDatasetProject,
      getOrganizations: ctx.getOrganizations,
      updateLocation: ctx.updateLocation,
    }}
  />
);
