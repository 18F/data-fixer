import React from 'react';

import {
  CreateDatasetProjectService,
  GetOrganizationsService,
} from 'datafixer/core/data';

import { Location } from '../routes';
import { CreateProjectForm } from '../components/dataset-project-create-form';

export const NewDatasetProjectPage = ({
  createDatasetProject,
  getOrganizations,
  updateLocation,
}: {
  createDatasetProject: CreateDatasetProjectService;
  getOrganizations: GetOrganizationsService;
  updateLocation: (location: Location) => void;
}) => (
  <CreateProjectForm
    createDatasetProject={createDatasetProject}
    getOrganizations={getOrganizations}
    updateLocation={updateLocation}
  />
);
