import React from 'react';

import {
  CreateDatasetProjectService,
  GetOrganizationService,
} from 'datafixer/core/data';

import { useOrganization } from '../hooks/organization';
import { OrganizationLocation } from '../routes';

type OrganizationPageContext = {
  createDatasetProject: CreateDatasetProjectService;
  getOrganization: GetOrganizationService;
};

export const OrganizationPage = (props: {
  ctx: OrganizationPageContext;
  location: OrganizationLocation;
}) => {
  const organization = useOrganization(
    props.location.organizationAlias,
    props.ctx.getOrganization
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
