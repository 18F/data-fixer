import { end, format, lit, parse, str, zero, Route } from 'fp-ts-routing';

import {
  DatasetId,
  ProjectAlias,
  OrganizationAlias,
} from 'datafixer/core/data';

export interface HomeLocation {
  readonly type: 'Home';
}

export interface OrganizationLocation {
  readonly type: 'Organization';
  readonly organizationAlias: OrganizationAlias;
}

export interface DatasetLocation {
  readonly type: 'Dataset';
  readonly organizationAlias: OrganizationAlias;
  readonly alias: ProjectAlias;
  readonly datasetId: DatasetId;
}

export interface ProjectLocation {
  readonly type: 'Project';
  readonly organizationAlias: OrganizationAlias;
  readonly alias: ProjectAlias;
}

export interface NotFoundLocation {
  readonly type: 'NotFound';
}

export type Location =
  | HomeLocation
  | DatasetLocation
  | OrganizationLocation
  | ProjectLocation
  | NotFoundLocation;

export interface UpdateLocation {
  (location: Location): void;
}

export const home: Location = {
  type: 'Home',
};

export const organizationLocation = (
  organizationAlias: OrganizationAlias
): Location => {
  return {
    type: 'Organization',
    organizationAlias,
  };
};

export const datasetLocation = (
  organizationAlias: OrganizationAlias,
  alias: ProjectAlias,
  datasetId: DatasetId
): Location => {
  return {
    type: 'Dataset',
    organizationAlias,
    alias,
    datasetId,
  };
};

export const projectLocation = (
  organizationAlias: OrganizationAlias,
  alias: ProjectAlias
): Location => {
  return {
    type: 'Project',
    organizationAlias,
    alias,
  };
};

const notFound: Location = {
  type: 'NotFound',
};

const homeMatch = end;
const organization = str('organizationAlias');
const organizationMatch = organization.then(end);
const project = organization.then(str('alias'));
const projectMatch = project.then(end);
const datasetMatch = project.then(str('datasetId')).then(end);

const router = zero<Location>()
  .alt(homeMatch.parser.map(() => home))
  .alt(
    organizationMatch.parser.map(({ organizationAlias }) =>
      organizationLocation(organizationAlias)
    )
  )
  .alt(
    datasetMatch.parser.map(({ organizationAlias, alias, datasetId }) =>
      datasetLocation(organizationAlias, alias, datasetId)
    )
  )
  .alt(
    projectMatch.parser.map(({ organizationAlias, alias }) =>
      projectLocation(organizationAlias, alias)
    )
  );

export const parseLocation = (s: string): Location => {
  return parse(router, Route.parse(s), notFound);
};

export const getUrl = (location: Location): string => {
  switch (location.type) {
    case 'Home':
      return format(homeMatch.formatter, location);
    case 'Dataset':
      return format(datasetMatch.formatter, location);
    case 'Project':
      return format(projectMatch.formatter, location);
    case 'Organization':
      return format(organizationMatch.formatter, location);
    case 'NotFound':
      return '/';
  }
};
