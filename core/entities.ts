import * as t from 'io-ts';

const DatasetIdValidator = t.string;
export type DatasetId = t.TypeOf<typeof DatasetIdValidator>;

const DatasetValidator = t.type({
  id: DatasetIdValidator,
  title: t.string,
  source: t.string,
  description: t.string,
  lastModified: t.string,
  versions: t.array(DatasetIdValidator),
  sources: t.array(DatasetIdValidator),
  consumers: t.array(DatasetIdValidator),
  table: t.array(t.any),
  schema: t.type({
    type: t.string,
    description: t.string,
  }),
});
export type Dataset = t.TypeOf<typeof DatasetValidator>;

const DatasetArrayValidator = t.array(DatasetValidator);
export type Datasets = t.TypeOf<typeof DatasetArrayValidator>;
