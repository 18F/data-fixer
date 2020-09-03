import React from 'react';

import {
  CreateDatasetProjectService,
  GetOrganizationService,
} from 'datafixer/core/data';

import { useOrganization } from '../hooks/organization';
import { OrganizationLocation } from '../routes';

export const OrganizationPage = ({
  createDatasetProject,
  getOrganization,
  location,
}: {
  createDatasetProject: CreateDatasetProjectService;
  getOrganization: GetOrganizationService;
  location: OrganizationLocation;
}) => {
  const organization = useOrganization(
    location.organizationAlias,
    getOrganization
  );

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{organization.name}</h1>
    </>
  );
};
