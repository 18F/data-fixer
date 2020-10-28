"""
A Click command for running this Python task.
"""

import click

from processors.tasks.create_mock_dataset.task import task


@click.command()
@click.argument('arg1', required=True)
@click.argument('arg2', required=True)
@click.pass_context
def create_mock_dataset(ctx: click.core.Context, arg1: str, arg2: str) -> None:
    """Sample job."""
    task(ctx.obj, arg1, arg2)
