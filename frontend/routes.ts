import { end, format, lit, parse, str, zero, Route } from 'fp-ts-routing';

import { DatasetProjectId } from 'datafixer/core/entities';

interface HomeLocation {
  readonly type: 'Home';
}

interface DatasetProjectLocation {
  readonly type: 'DatasetProject';
  readonly datasetProjectId: DatasetProjectId;
}

interface NotFoundLocation {
  readonly type: 'NotFound';
}

export type Location = HomeLocation | DatasetProjectLocation | NotFoundLocation;

export const home: Location = {
  type: 'Home',
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
const datasetProjectMatch = lit('datasets')
  .then(str('datasetProjectId'))
  .then(end);

const router = zero<Location>()
  .alt(homeMatch.parser.map(() => home))
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
    case 'DatasetProject':
      return format(datasetProjectMatch.formatter, location);
    case 'NotFound':
      return '/';
  }
};
