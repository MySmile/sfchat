#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sfchat.settings.local")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


    # from apps.chat.tasks import clear_chats
    # import django_rq
    #
    # queue = django_rq.get_queue('default')
    # queue.enqueue(clear_chats)