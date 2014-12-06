import json

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.http import HttpResponse

import logging
logger = logging.getLogger(__name__)


class CSPReport(View):
    REPORT_KEYS = (
        'blocked-uri',
        'document-uri',
        'original-policy',
        'referrer',
        'script-sample',
        'source-file',
        'violated-directive')

    REPORT_MAX_ITEM_LENGTH = 1024

    def post(self):
        """
        Content Security Policy Report
        http://www.w3.org/TR/CSP/#report-uri
        :param request:
        :return: HttpResponse
        """
        if self.request.META.get('Content-Type') != 'application/json':
            raise AttributeError('Wrong CSP report header format.')

        report_json = json.loads(self.request.body)
        if not report_json.has_key('csp-report'):
            raise AttributeError('CSP report does not have root attribute.')

        report = 'CSP REPORT \n' + self.request.META.get('REMOTE_ADDR') \
                 + '\n' + self.request.META.get('HTTP_USER_AGENT')
        for item in self.REPORT_KEYS:
            if not report_json['csp-report'].has_key(item)\
                    or type(report_json['csp-report'][item]) is not str\
                    or len(report_json['csp-report'][item]) > self.REPORT_MAX_ITEM_LENGTH:
                raise AttributeError('CSP report has invalid attribute {0}.'.format(item))

            report += '\n' + item + ': ' + report_json['csp-report'][item]

        logger.error(report)

        response = HttpResponse()
        response.status_code = 204
        return response

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(CSPReport, self).dispatch(*args, **kwargs)