#~ # -*- coding: utf-8 -*-

from django.test.runner import DiscoverRunner
#~ from django.test import TransactionTestCase

from mongoengine import connect

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
