load("@pip//:requirements.bzl", "all_requirements")
load("@rules_python//python:defs.bzl", "py_binary")

def ipython(name, deps, **kwargs):
    py_binary(
        name = name,
        srcs = ["//tools/ipython:shell.py"],
        deps = deps + all_requirements,
    )
