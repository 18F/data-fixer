from uuid import uuid4


def load_dataset(uri):
    pass


def new_dataset(ctx):
    print(ctx.dataset_root)
    uri = uuid4()
    return uri
