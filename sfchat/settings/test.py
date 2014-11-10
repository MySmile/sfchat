# -*- coding: utf-8 -*-
"""
Django settings/test.py for SFChat development project.
"""
#~ import os
#~ import datetime

#~ from config.local import *
#~ from .base import *
#~ from .local import *

#~ TEST_RUNNER = "discover_runner.DiscoverRunner"
#~ TEST_RUNNER = ".test.TestRunner"
#~ TEST_DISCOVER_TOP_LEVEL = PROJECT_ROOT
#~ TEST_DISCOVER_ROOT = PROJECT_ROOT
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

from django.test.simple import DjangoTestSuiteRunner
from django.test import TestCase


class NoSQLTestRunner(DjangoTestSuiteRunner):
    def setup_databases(self):
        print('SETUP DATABASE')
        connect('sfchattest', host='localhost', port=27017, username='', password='')
        pass
    def teardown_databases(self, *args):
        print('TEAR DOWN')
        pass
