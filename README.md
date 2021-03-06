# 10x datafixer prototype

This repository contains the prototype for the Phase 2 [10x](https://10x.gsa.gov/) "Data Fixer" tool.

The original 10x pitch text:

> Data practitioners are often faced with incorrectly-formatted data for fields that have known formats, such as zip code or social security number. TTS will explore using machine learning to extend the 10x U.S. Data Federation's ReVal tool (or to create a new tool) capable of not only validating data, but proposing fixes when such formatting errors are identified, which could result in much quicker data repair, saving time and effort for practitioners. - the U.S. Data Federation, Data Fixer Author

An overview of the application architecture is in [docs/architecture.md](docs/architecture.md).

## Developer Instructions

This project uses the [Bazel](https://bazel.build/) build system. Installation of Bazel and all dependencies is bootstrapped with [yarn](https://yarnpkg.com/).

To install all application dependencies:

```bash
yarn install
```

### Build

To do a complete build:

```bash
yarn build
```

### Frontend devserver

To run a local frontend dev server on port 9000:

```bash
yarn start
```

### Local node.js server

To start a local node.js server for the backend:

```bash
yarn server
```

### Test suite

There is currently little test coverage, but the test suite may be run with:

```bash
yarn test
```

## Notes

Python dependencies are specified in requirements.in, with all transitive dependencies in requirements.txt, but managed with Bazel via requirements.txt. To update the transitive depdencies, use [pip-compile](https://github.com/jazzband/pip-tools#example-usage-for-pip-compile):

```bash
pip-compile --generate-hashes --allow-unsafe requirements.in >> requirements.txt
```

There is also a shell target available for testing Python dependencies in a sample Python job. This will spawn an IPython repl with provided dependencies available:

```bash
yarn bazel run //processors/tasks/create_mock_dataset:shell
```

## Deployment

The deployable build artifact is a Docker image that runs the node.js server. The server includes all assets required to host the application, and can be built and deployed into a cloud.gov sandbox with appropriate credentials:

```bash
./bin/deploy.sh
```
