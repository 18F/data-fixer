import sys

import pytest

if __name__ == "__main__":
    # Proxy to pytest, exiting with a success/fail status code.
    print(sys.argv)
    sys.exit(pytest.main(sys.argv))
