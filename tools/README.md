# Bazel macros

This directory includes Starlark macros.

## ipython

To create a shell target, with a project available in its namespace. To use:

```starlark
load("//tools/ipython:ipython.bzl", "ipython")

ipython(
    name = "shell",
    deps = [
        ":mylib",
    ],
)
```

... and to run:

```bash
yarn bazel run //<target-path>:shell
```
