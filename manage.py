import os
import sys
from django.core.exceptions import ImproperlyConfigured

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sfchat.settings.local")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


