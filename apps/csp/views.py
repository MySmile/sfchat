from django.shortcuts import render
# Create your views here.

import logging
logger = logging.getLogger(__name__)


def csp_report(request):
    logger.info(request.POST['csp-report'])