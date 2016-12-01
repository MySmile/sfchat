import json

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.http import HttpResponse

import logging
logger = logging.getLogger(__name__)


class CSPReport(View):
    REPORT_KEYS = (
        'document-uri',
        'referrer',
        'blocked-uri',
        'violated-directive',
        'original-policy')

    REPORT_MAX_ITEM_LENGTH = 1024

    def post(self, request, *args, **kwargs):
        """
        Content Security Policy Report
        http://www.w3.org/TR/CSP/#report-uri
        :param request:
        :return: HttpResponse
        """
        if request.META.get('CONTENT_TYPE') != 'application/csp-report':
            raise AttributeError('Wrong CSP report header format.')

        logger.error(request.body.decode('utf-8'))
        report_json = json.loads(request.body.decode('utf-8'))
        if 'csp-report' not in report_json.keys():
            raise AttributeError('CSP report does not have root attribute.')

        report = '===CSP REPORT=== \nremote-addr: ' + request.META.get('REMOTE_ADDR') \
                 + '\nuser-agent: ' + request.META.get('HTTP_USER_AGENT')

        for item in self.REPORT_KEYS:
            report_item = str(report_json['csp-report'][item])[0:self.REPORT_MAX_ITEM_LENGTH]
            report += '\n' + str(item) + ': ' + report_item
        logger.error(report)

        response = HttpResponse()
        response.status_code = 204
        return response

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(CSPReport, self).dispatch(*args, **kwargs)