load("@rules_python//python:defs.bzl", "py_test")
load("@pip//:requirements.bzl", "requirement")

# Note - the naming is confusing. `py_test` refers to the standard Bazel Python
# test macro; `pytest` is the popular Python test framework available on PyPI.
def pytest_test(
        name,
        args = [],
        deps = [],
        srcs = [],
        **extra_py_test_kwargs):
    """
    Macro that runs Python tests via pytest.
    The general idea for this macro was borrowed from https://github.com/ali5h/rules_pip.
    """

    if "main" in extra_py_test_kwargs:
        fail("usage of py_test main not supported")

    # py_test gets confused if the name is the same as a source directory
    for src in srcs:
        if name == src.split("/", 1)[0]:
            fail("rule name (%s) cannot be the same as the directory of the tests (%s)" % (name, src))

    py_test(
        name = name,
        srcs = srcs + ["//tools/pytest:run_pytest.py"],
        main = "run_pytest.py",
        deps = [requirement("pytest")],
        args = args + [
            "--verbose",
            ".",
        ],
        **extra_py_test_kwargs
    )
