# -*- coding: utf-8 -*-
"""
Django settings/test.py for SFChat development project.
"""
import os
import datetime

from config.local import *
from .base import *

TEST_RUNNER = "discover_runner.DiscoverRunner"
TEST_DISCOVER_TOP_LEVEL = PROJECT_ROOT
TEST_DISCOVER_ROOT = PROJECT_ROOT
TEST_DISCOVER_PATTERN = "test_*"