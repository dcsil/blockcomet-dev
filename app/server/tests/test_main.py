import pytest
from src.main import *

def test_read_root():
    assert read_root() == {"Hello": "World"}