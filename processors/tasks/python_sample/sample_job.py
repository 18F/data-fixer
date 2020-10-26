def test():
    print('Hello, world!')

def main():
    import pdb; pdb.set_trace()  #pylint: disable=C0321
    test()

if __name__ == '__main__':
    main()
