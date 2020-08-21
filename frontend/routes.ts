import { end, format, lit, parse, str, zero, Route } from 'fp-ts-routing';

import { DatasetId, DatasetProjectId } from 'datafixer/core/data';

interface HomeLocation {
  readonly type: 'Home';
}

interface DatasetLocation {
  readonly type: 'Dataset';
  readonly datasetId: DatasetId;
}

interface DatasetProjectLocation {
  readonly type: 'DatasetProject';
  readonly datasetProjectId: DatasetProjectId;
}

interface NotFoundLocation {
  readonly type: 'NotFound';
}

export type Location =
  | HomeLocation
  | DatasetLocation
  | DatasetProjectLocation
  | NotFoundLocation;

export const home: Location = {
  type: 'Home',
};

export const datasetLocation = (datasetId: DatasetId): Location => {
  return {
    type: 'Dataset',
    datasetId,
  };
};

export const datasetProjectLocation = (
  datasetProjectId: DatasetProjectId
): Location => {
  return {
    type: 'DatasetProject',
    datasetProjectId,
  };
};

const notFound: Location = {
  type: 'NotFound',
};

const homeMatch = end;
const datasetMatch = lit('datasets').then(str('datasetId')).then(end);
const datasetProjectMatch = lit('projects')
  .then(str('datasetProjectId'))
  .then(end);

const router = zero<Location>()
  .alt(homeMatch.parser.map(() => home))
  .alt(datasetMatch.parser.map(({ datasetId }) => datasetLocation(datasetId)))
  .alt(
    datasetProjectMatch.parser.map(({ datasetProjectId }) =>
      datasetProjectLocation(datasetProjectId)
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
    case 'DatasetProject':
      return format(datasetProjectMatch.formatter, location);
    case 'NotFound':
      return '/';
  }
};
