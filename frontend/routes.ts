import { end, format, lit, parse, str, zero, Route } from 'fp-ts-routing';

import { DatasetId } from 'datafixer/core/entities';

interface HomeLocation {
  readonly type: 'Home';
}

interface DatasetLocation {
  readonly type: 'Dataset';
  readonly datasetId: DatasetId;
}

interface NotFoundLocation {
  readonly type: 'NotFound';
}

export type Location = HomeLocation | DatasetLocation | NotFoundLocation;

export const home: Location = {
  type: 'Home',
};

export const datasetLocation = (datasetId: DatasetId): Location => {
  return {
    type: 'Dataset',
    datasetId,
  };
};

const notFound: Location = {
  type: 'NotFound',
};

const homeMatch = end;
const datasetMatch = lit('datasets').then(str('datasetId')).then(end);

const router = zero<Location>()
  .alt(homeMatch.parser.map(() => home))
  .alt(datasetMatch.parser.map(({ datasetId }) => datasetLocation(datasetId)));

export const parseLocation = (s: string): Location => {
  return parse(router, Route.parse(s), notFound);
};

export const getUrl = (location: Location): string => {
  switch (location.type) {
    case 'Home':
      return format(homeMatch.formatter, location);
    case 'Dataset':
      return format(datasetMatch.formatter, location);
    case 'NotFound':
      return '/';
  }
};
