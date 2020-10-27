import os.path

import pytest

from processors.lib.python import datasets


@pytest.fixture
def ctx(tmp_path):
    class AppContext:
        dataset_root = tmp_path

    return AppContext()


def test_create_dataset(ctx):
    assert os.path.exists(ctx.dataset_root)
    assert datasets.new_dataset(ctx)
