import os

import click

from processors.tasks.python_sample.command import sample_job


class AppContext:
    def __init__(self):
        self.dataset_root = os.environ['DATAFIXER_DATASET_ROOT']


@click.group()
@click.pass_context
def cli(ctx):
    ctx.obj = AppContext()


cli.add_command(sample_job)


if __name__ == '__main__':
    cli()
