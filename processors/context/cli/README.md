# Command-line data processing task runner

This package includes a task runner for Python tasks, implemented via a Click command-line parser.

This target requires the following environment variables, which may be set in a `.env` file in the workspace root:

```bash
# Set to root dataset location path
DATAFIXER_DATASET_ROOT=file:///Users/me/data
```

## Usage

```bash
yarn bazel run //processors/context/cli --help
```

## Extending

To add additional Python tasks to this module, create a Click command handler with the appropriate arguments in that task implementation and add it to the root Click handler in [processors/context/cli/run.py](./run.py). The existing tasks may be used as a template.

Note: there is an issue passing arguments (--arg) from yarn to Bazel to the cli entrypoint script (they get intercepted by yarn). So, constain additional commands to just using Click options or prompts when adding new tasks.
