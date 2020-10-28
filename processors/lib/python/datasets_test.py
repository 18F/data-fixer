import os.path

import pytest

from processors.lib.python import datasets
from processors.lib.python.context import Context


@pytest.fixture
def ctx(tmp_path: str) -> Context:
    return Context(
        dataset_root=tmp_path
    )


def test_create_dataset(ctx: Context) -> None:
    assert os.path.exists(ctx.dataset_root)
    assert datasets.initalize_dataset(ctx)
