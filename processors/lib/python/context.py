from dataclasses import dataclass


@dataclass
class Context:
    """Application context object, to be used for passing environment-dependent
    configuration to Python tasks. It is the responsibility of the context
    entrypoint to construct an instance of this dataclass.
    """

    dataset_root: str
