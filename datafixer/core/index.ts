import * as t from 'io-ts';

// Define a type for entity IDs; for now, just use a string - but this should
// be a UUID in the future.
const Identifier = t.string;
type Identifier = t.TypeOf<typeof Identifier>;
export type DatasetId = Identifier;
export type ProjectId = Identifier;
export type OrganizationId = Identifier;

const OrganizationAlias = t.string;
export type OrganizationAlias = t.TypeOf<typeof OrganizationAlias>;
const ProjectAlias = t.string;
export type ProjectAlias = t.TypeOf<typeof ProjectAlias>;

export const OrganizationReference = t.type({
  id: Identifier,
  alias: OrganizationAlias,
});
export type OrganizationReference = t.TypeOf<typeof OrganizationReference>;

const ProjectReference = t.type({
  id: Identifier,
  alias: ProjectAlias,
  organization: OrganizationReference,
});
type ProjectReference = t.TypeOf<typeof ProjectReference>;

const TabularData = t.array(t.array(t.any));
export type TabularData = t.TypeOf<typeof TabularData>;

const Organization = t.type({
  id: Identifier,
  name: t.string,
  alias: OrganizationAlias,
});
export type Organization = t.TypeOf<typeof Organization>;

const Dataset = t.type({
  id: Identifier,
  projectId: Identifier,
  schema: t.type({
    type: t.string,
    description: t.string,
  }),
  data: TabularData,
  consumers: t.array(Identifier),
  sources: t.array(Identifier),
});
export type Dataset = t.TypeOf<typeof Dataset>;

const UploadSource = t.type({
  type: t.literal('upload'),
});

const MirrorSource = t.type({
  type: t.literal('mirror'),
  sourceUrl: t.string,
});

const AggregateSource = t.type({
  type: t.literal('aggregate'),
  projects: t.array(ProjectReference),
});

const SourceType = t.union([UploadSource, MirrorSource, AggregateSource]);
export type SourceType = t.TypeOf<typeof SourceType>;

export const DatasetProjectDetails = t.type({
  title: t.string,
  source: t.string,
  description: t.string,
});
export type DatasetProjectDetails = t.TypeOf<typeof DatasetProjectDetails>;

export const DatasetProject = t.type({
  id: Identifier,
  organization: OrganizationReference,
  alias: ProjectAlias,
  source: SourceType,
  consumers: t.array(ProjectReference),
  details: DatasetProjectDetails,
  datasetVersions: t.array(Identifier),
});
export type DatasetProject = t.TypeOf<typeof DatasetProject>;

const MockData = t.type({
  datasetProjects: t.record(Identifier, DatasetProject),
  datasets: t.record(Identifier, Dataset),
});
type MockData = t.TypeOf<typeof MockData>;
