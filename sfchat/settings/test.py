#~ # -*- coding: utf-8 -*-

from django.test.simple import DjangoTestSuiteRunner
#~ from django.test import TransactionTestCase

from mongoengine import connect

_running_test = False


class NoSQLTestRunner(DjangoTestSuiteRunner):
    mongodb_name = 'sfchattest'

    def setup_databases(self, **kwargs):
        from mongoengine.connection import connect, disconnect
        disconnect()
        connect(self.mongodb_name)
        print('Creating mongo test-database ' + self.mongodb_name)
        return super(NoSQLTestRunner, self).setup_databases(**kwargs)

    def teardown_databases(self, old_config, **kwargs):
        from mongoengine.connection import get_connection, disconnect
        connection = get_connection()
        connection.drop_database(self.mongodb_name)
        print('Dropping mongo test-database: ' + self.mongodb_name)
        disconnect()
        super(NoSQLTestRunner, self).teardown_databases(old_config, **kwargs)





















#~ # -*- coding: utf-8 -*-
#~ """
#~ Django settings/test.py for SFChat development project.
#~ """
#~ import os
#~ import datetime

#~ from config.local import *
#~ from .base import *
#~ from .local import *

#~ TEST_RUNNER = "discover_runner.DiscoverRunner"
#~ TEST_RUNNER = "tests.test_runner.NoSQLTestRunner"
#~ TEST_DISCOVER_TOP_LEVEL = BASE_DIR
#~ TEST_DISCOVER_ROOT = BASE_DIR
#~ TEST_DISCOVER_PATTERN = "test_*"


#~ 
#~ from django.test.simple import DjangoTestSuiteRunner
#~ from django.test import TransactionTestCase
#~ 
#~ from mongoengine import connect
#~ 
#~ _running_test = False
#~ 
#~ class NoSQLTestRunner(DjangoTestSuiteRunner):
    #~ def setup_databases(self, **kwangs):
        #~ global _running_test
        #~ _running_test = True
        #~ print('}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}')
        #~ db_name = 'sfchattest'
        #~ connect(db_name, host='localhost', port=27017, username='', password='')
        #~ print('Creating test-database: ' + db_name)
#~ 
        #~ return db_name
#~ 
    #~ def teardown_databases(self, db_name, **kwargs):
        #~ from pymongo import Connection
        #~ conn = Connection()
        #~ conn.drop_database(db_name)
        #~ print('Dropping test-database: ' + db_name)


#~ 
#~ 

#~ 
#~ from django.test.simple import DjangoTestSuiteRunner
#~ from django.test import TestCase
#~ 
#~ 
#~ class NoSQLTestRunner(DjangoTestSuiteRunner):
    #~ def setup_databases(self):
        #~ print('SETUP DATABASE')
        #~ connect('sfchattest', host='localhost', port=27017, username='', password='')
        #~ pass
    #~ def teardown_databases(self, *args):
        #~ print('TEAR DOWN')
        #~ pass
