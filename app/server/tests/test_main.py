import pytest
from server.main import *

def test_read_root():
    assert read_root() == {"Welcome to": "Blockcomet"}