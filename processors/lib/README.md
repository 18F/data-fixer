# Common data processing utilities

This package includes common, shared code for each task runtime. Shared utilities would include code that does things like:

- Create a new dataset in the dataset root location
- Open a data frame given a dataset URI
- Make service calls to the application core

Each target language needs its own such utilties. Current implementations are:

- [processors/lib/python](./python) - Python language utilities
