# Data processor entrypoints

Each data processing entrypoint has a corresponding context directory. A production entrypoint may be a task runner such as a Dask Scheduler, Celery worker, etc.

A development entrypoint might be a command-line interface for testing jobs.

Existing entrypoints are:

- [processors/context/cli](./cli) - Command-line task runner, for local development purposes
