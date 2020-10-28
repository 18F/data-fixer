import os
from uuid import uuid4

from processors.lib.python.context import Context


def load_dataset(uri: str) -> None:
    pass


def initalize_dataset(ctx: Context) -> str:
    """
    Initialize a new dataset location, to be written to by a processing task.
    A dataset location is a directory (or S3 prefix) that contains raw data and
    metadata of a specific collection of data.

    *** Prototype NOTE ***
    This implementation is for prototyping convenience:
    - This assumes that the dataset root is on the local filesystem rather than
    S3.
    - This behavior should very likely be managed by the Typescript core, and
    invoked via a service call.
    """

    uuid = str(uuid4())
    uri = os.path.join(ctx.dataset_root, uuid)
    os.makedirs(uri)

    return uri
