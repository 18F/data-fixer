import { fold } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { useState, useEffect } from 'react';

import {
  GetOrganizationService,
  GetOrganizationsService,
  Organization,
  OrganizationAlias,
} from 'datafixer/core/data';

export const useOrganization = (
  organizationAlias: OrganizationAlias,
  getOrganization: GetOrganizationService
) => {
  const [organization, setOrganization] = useState<Organization | undefined>();

  useEffect(() => {
    getOrganization(organizationAlias).then(organization => {
      return setOrganization(
        pipe(
          organization,
          fold(
            () => undefined,
            org => org
          )
        )
      );
    });
  }, [organizationAlias]);

  return organization;
};

export const useOrganizations = (getOrganizations: GetOrganizationsService) => {
  const [organizations, setOrganizations] = useState<
    Array<Organization> | undefined
  >();

  useEffect(() => {
    getOrganizations().then(organizations => {
      return setOrganizations(organizations);
    });
  }, []);

  return organizations;
};
