import { createDomain, Store } from 'effector';
import { pipe } from 'fp-ts/lib/function';
import { fold } from 'fp-ts/lib/Option';

import { Organization, OrganizationAlias } from 'datafixer/core';
import { GetOrganizationService } from 'datafixer/services/dataset';
import {
  LocationService,
  OrganizationLocation,
} from 'datafixer/services/routes';

export type Context = {
  getOrganization: GetOrganizationService;
  locationService: LocationService;
};

export const OrganizationPresenter = (ctx: Context) => {
  const OrgDomain = createDomain('organization');
  const location = ctx.locationService.getLocation() as OrganizationLocation;

  const getOrganization = OrgDomain.effect<
    OrganizationAlias,
    Organization | null,
    Error
  >({
    handler: async organizationAlias => {
      return ctx.getOrganization(organizationAlias).then(organization => {
        return pipe(
          organization,
          fold(
            () => null,
            org => org
          )
        );
      });
    },
  });

  const organization: Store<Organization | null> = OrgDomain.store<Organization | null>(
    null
  ).on(getOrganization.done, (_, { result }) => result);

  // Initiate organization retrieval
  getOrganization(location.organizationAlias);

  return {
    organization,
  };
};
export type OrganizationPresenter = ReturnType<typeof OrganizationPresenter>;
