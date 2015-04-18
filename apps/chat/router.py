from django.conf import settings

admin_apps = ('auth', 'sessions', 'contenttypes', 'admin', 'messages' )

class AdminRouter(object):
    def db_for_read(self, model, **hints):
        if model._meta.app_label in admin_apps:
            return 'default'
        return None

    def db_for_write(self, model, **hints):
        if (model._meta.app_label in admin_apps):
            return 'default'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label in admin_apps or \
           obj2._meta.app_label in admin_apps:
           return True
        return None

    def allow_migrate(self, db, model):
        # print('APPS ----- ', model._meta.app_label)
        if db == 'default':
            return model._meta.app_label in admin_apps
        elif (model._meta.app_label  in admin_apps):
            return False
        return None


class SFChatRouter(object):
    def db_for_read(self, model, **hints):
        if model._meta.app_label in admin_apps:
            return 'default'
        return 'sfchat'

    def db_for_write(self, model, **hints):
        if model._meta.app_label in admin_apps:
            return 'default'
        return 'sfchat'

    def allow_relation(self, obj1, obj2, **hints):
        db_for_write
        if model._meta.app_label in admin_apps:
            return 'default'
        return True

    def allow_migrate(self, db, model):
        if (model._meta.app_label in admin_apps):
            return 'default'
        return None
