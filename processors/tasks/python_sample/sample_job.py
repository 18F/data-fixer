from processors.lib.python import datasets


def task(ctx, arg1, arg2):
    print(arg1, arg2, datasets.new_dataset(ctx))


if __name__ == '__main__':
    task()
