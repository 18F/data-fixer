load("@pip//:requirements.bzl", "all_requirements")
load("@rules_python//python:defs.bzl", "py_binary")

def notebook(name, deps, **kwargs):
    py_binary(
        name = name,
        main = "//tools/jupyter:launch_notebook.py",
        srcs = ["//tools/jupyter:launch_notebook.py"],
        deps = deps + all_requirements,
    )
