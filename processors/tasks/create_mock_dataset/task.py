import csv
import os

from processors.lib.python import datasets
from processors.lib.python.context import Context


def task(ctx: Context, arg1: str, arg2: str) -> None:
    """
    Write a bunch of mock CSV data to a new dataset.
    NOTE: This assumes local filesystem and is just for initial prototyping
    purposes.
    """

    dataset_prefix = datasets.initalize_dataset(ctx)
    out_path = os.path.join(dataset_prefix, 'data')
    with open(out_path, 'w') as out_file:
        writer = csv.writer(out_file)
        for index in range(100):
            writer.writerow((arg1, arg2) * 5)
