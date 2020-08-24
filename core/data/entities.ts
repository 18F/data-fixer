import * as t from 'io-ts';

// Define a type for entity IDs; for now, just use a string - but this should
// be a UUID in the future.
const IdentifierV = t.string;
type Identifier = t.TypeOf<typeof IdentifierV>;
export type DatasetId = Identifier;
export type ProjectId = Identifier;
export type OrganizationId = Identifier;

const OrganizationAliasV = t.string;
export type OrganizationAlias = t.TypeOf<typeof OrganizationAliasV>;
const ProjectAliasV = t.string;
export type ProjectAlias = t.TypeOf<typeof ProjectAliasV>;

const OrganizationReferenceV = t.type({
  id: IdentifierV,
  alias: OrganizationAliasV,
});
type OrganizationReference = t.TypeOf<typeof OrganizationReferenceV>;

const ProjectReferenceV = t.type({
  id: IdentifierV,
  alias: ProjectAliasV,
  organization: OrganizationReferenceV,
});
type ProjectReference = t.TypeOf<typeof ProjectReferenceV>;

const TabularDataV = t.array(t.array(t.any));
export type TabularData = t.TypeOf<typeof TabularDataV>;

const OrganizationV = t.type({
  id: IdentifierV,
  name: t.string,
  alias: OrganizationAliasV,
});
export type Organization = t.TypeOf<typeof OrganizationV>;

const DatasetV = t.type({
  id: IdentifierV,
  projectId: IdentifierV,
  schema: t.type({
    type: t.string,
    description: t.string,
  }),
  data: TabularDataV,
  consumers: t.array(IdentifierV),
  sources: t.array(IdentifierV),
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
  projects: t.array(ProjectReferenceV),
});

const SourceTypeV = t.union([UploadSourceV, MirrorSourceV, AggregateSourceV]);
export type SourceType = t.TypeOf<typeof SourceTypeV>;

const DatasetProjectV = t.type({
  id: IdentifierV,
  organization: OrganizationReferenceV,
  alias: ProjectAliasV,
  source: SourceTypeV,
  consumers: t.array(ProjectReferenceV),
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
