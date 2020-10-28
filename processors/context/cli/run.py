import os
from urllib.parse import urlparse

import click

from processors.lib.python.context import Context
from processors.tasks.create_mock_dataset.command import create_mock_dataset


def create_app_context() -> Context:
    parse_result = urlparse(os.environ['DATAFIXER_DATASET_ROOT'])
    if parse_result.scheme != 'file':
        raise ValueError('DATAFIXER_DATASET_ROOT: only local filesystem supported')

    return Context(
         dataset_root=parse_result.path
    )


@click.group()
@click.pass_context
def cli(ctx: click.core.Context) -> None:
    ctx.obj = create_app_context()


cli.add_command(create_mock_dataset)


if __name__ == '__main__':
    cli()
