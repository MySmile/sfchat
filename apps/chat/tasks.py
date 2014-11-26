from celery import Celery
import time

#Specify mongodb host and datababse to connect to
BROKER_URL = 'mongodb://localhost:27017/celery_sfchat'

tt = Celery('EOD_TASKS', broker=BROKER_URL)

#Loads settings for Backend to store results of jobs
tt.config_from_object('config.celeryconfig')

@tt.task
def add(x, y):
    time.sleep(30)
    return x + y


