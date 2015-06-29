#~ # -*- coding: utf-8 -*-


"""
Django settings/test.py for SFChat project.
"""
import os, sys
import shutil
import tempfile
import logging
logger = logging.getLogger(__name__)  # Get an instance of a logger

# test local
# from config.local import *
# from .base import *
# from .local import *
#
#
# class DisableMigrations(object):
#     def __contains__(self, item):
#         return True
#
#     def __getitem__(self, item):
#         return "notmigrations"
#
#
# TESTS_IN_PROGRESS = False
# if 'test' in sys.argv[1:] or 'jenkins' in sys.argv[1:]:
#     logging.disable(logging.CRITICAL)
#     PASSWORD_HASHERS = (
#         'django.contrib.auth.hashers.MD5PasswordHasher',
#     )
#     DEBUG = False
#     TEMPLATE_DEBUG = False
#     TESTS_IN_PROGRESS = True
#     MIGRATION_MODULES = DisableMigrations()

from django.test.runner import DiscoverRunner
#~ from django.test import TransactionTestCase

# from mongoengine import connect

_running_test = False


class NoSQLTestRunner(DiscoverRunner):
    mongodb_name = 'sfchattest'

    def setup_databases(self, **kwargs):
        from mongoengine.connection import connect, disconnect
        disconnect()
        connect(self.mongodb_name)
        print('Creating mongo test-database ' + self.mongodb_name)
        return super(NoSQLTestRunner, self).setup_databases(**kwargs)

    # def teardown_databases(self, old_config, **kwargs):
    #     from mongoengine.connection import get_connection, disconnect
    #     connection = get_connection()
    #     connection.drop_database(self.mongodb_name)
    #     print('Dropping mongo test-database: ' + self.mongodb_name)
    #     disconnect()
    #     super(NoSQLTestRunner, self).teardown_databases(old_config, **kwargs)

