# -*- coding: utf-8 -*-
"""
WSGI config for sfchat project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/howto/deployment/wsgi/
"""
import os, sys
from django.core.wsgi import get_wsgi_application


root_dir = os.path.dirname(os.path.realpath(__file__))
sys.path.append(os.path.join(root_dir, '../'))
sys.path.append(root_dir)
sys.path.append(os.path.join(root_dir, 'settings/'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sfchat.settings.local")

application = get_wsgi_application()
