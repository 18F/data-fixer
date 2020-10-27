"""
A Click command for running this Python task.
"""

import click

from processors.tasks.python_sample.sample_job import task


@click.command()
@click.argument('arg1', required=True)
@click.argument('arg2', required=True)
@click.pass_context
def sample_job(ctx, arg1, arg2):
    """Sample job."""
    task(ctx.obj, arg1, arg2)


if __name__ == '__main__':
    sample_job()
