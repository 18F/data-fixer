import * as t from 'io-ts';

const IdentifierV = t.string;
type Identifier = t.TypeOf<typeof IdentifierV>;
export type DatasetId = Identifier;
export type DatasetProjectId = Identifier;

const TabularDataV = t.array(t.array(t.any));
export type TabularData = t.TypeOf<typeof TabularDataV>;

const DatasetV = t.type({
  id: IdentifierV,
  schema: t.type({
    type: t.string,
    description: t.string,
  }),
  data: TabularDataV,
});
export type Dataset = t.TypeOf<typeof DatasetV>;

const UploadSourceV = t.type({
  type: t.literal('upload'),
});

const MirrorSourceV = t.type({
  type: t.literal('mirror'),
  sourceUrl: t.string,
});

const AggregateSourceV = t.type({
  type: t.literal('aggregate'),
  projects: t.array(
    t.type({
      id: IdentifierV,
      details: t.any,
    })
  ),
});

const SourceTypeV = t.union([UploadSourceV, MirrorSourceV, AggregateSourceV]);
export type SourceType = t.TypeOf<typeof SourceTypeV>;

const DatasetProjectV = t.type({
  id: IdentifierV,
  source: SourceTypeV,
  details: t.type({
    title: t.string,
    source: t.string,
    description: t.string,
  }),
  datasetVersions: t.array(IdentifierV),
});
export type DatasetProject = t.TypeOf<typeof DatasetProjectV>;

const MockDataV = t.type({
  datasetProjects: t.record(IdentifierV, DatasetProjectV),
  datasets: t.record(IdentifierV, DatasetV),
});
type MockData = t.TypeOf<typeof MockDataV>;
