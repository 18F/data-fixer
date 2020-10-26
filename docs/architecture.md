# Architectural overview

_Data Fixer_ (name pending), is developed as a [Bazel](https://bazel.build/)-managed monorepo with the following components and their intended function.

## Application core

The core purpose of the application is to manage the import and export of datasets, and to manage the orchestration of data processing jobs over those datasets.

The core application is written in Typescript. Each entrypoint of the application is defined as an application context in [datafixer/context](../datafixer/context), inspired by [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

### node.js server

The [node.js server](../datafixer/context/server) is responsible for serving all http requests, including built frontend assets.

Using a resource-driven approach, the web server exposes core application resource types via URI:

- *Dataset project* - description of collections of data, its schema, and desired data processing jobs
- *Dataset* - discrete set of data, e.g. a tabular table

Each exposed resource supports content-type negotiation, exposing both api semantics and server-rendered frontend html.

### Frontend

The [browser context](../datafixer/context/browser) is an isomorphic React-based frontend. It:

- Provides views of dataset projects and their corresponding datasets
- Implements UI for data correction workflows

## Data processing

Data processing involves two core concepts: datasets and jobs.

### Datasets

Datasets are identified by URI, which corresponds to a filesystem path. In production, this path would correspond to an S3 bucket prefix; for development purposes, it may refer to a local filesystem directory. In practice, the URI is a UUID.

Each dataset provides the following information via sub-paths of its path prefix:

- Raw data
- Format of data
- Metadata describing how dataset was created

For search purposes, the application may index datasets on the filesystem. However, the filesystem (or S3 object store) serves as the reference location for datasets. One may `aws s3 sync` or `rsync` datasets from one environment to another, for debugging purposes.

### Jobs

The underlying data processing jobs orchestrated by the application are run separately from the application core. Data processing jobs are defined as an idempotent process that takes as input:

- One or more dataset URIs
- Job parameters

... and produces one or more datasets as output.

To support the diversity of the data analytical ecosystem, data processing jobs may be written in Python, R, or any arbitrary language; additionally, they may work with data in any input format, and produce data in any output format. Common formats and libraries will be chosen to support the largest number of use-cases, but application architecture will not be dependent on those choices.

For reasons of practicality, initial data processing jobs will be written in Python. The orchestration method is undetermined.

### Processing considerations

To ease development during phase 3, a standard data format should be chosen for initial work. Options include [TileDB](https://github.com/TileDB-Inc/TileDB), [Parquet](https://parquet.apache.org/), [ORC](https://en.wikipedia.org/wiki/Apache_ORC), and others.

TileDB has been evaluated due to its flexibility of storing varied data structures, and possible potential to support some random-access use cases. It may be necessary to introduce an intermediate data store to stage data in support of the user-interface. Fortunately, the known phase 3 datasets are not excessively large in size, and cloud.gov deployments would likely be single-tenant.

## Build system

The [Bazel](https://bazel.build/) build system enables multi-language usage, in a disciplined and structured way. Python and Typescript build tooling is initialized in the [WORKSPACE](../WORKSPACE). The build system produces:

- Frontend CSS & Javascript
- node.js Docker image
- Python job Docker image
