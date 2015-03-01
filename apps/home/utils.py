from django.http import JsonResponse, HttpResponseNotFound
from django.template import RequestContext, loader, Template, TemplateDoesNotExist

import logging
logger = logging.getLogger(__name__)


def json_html_response(request, template_name, code, message):
    """
    Provide response in json or html format accordingly content-type
    :param request: HttpRequest
    :param template_name: String
    :param code: Integer
    :param message: String
    :return: JsonResponse|HttpResponseNotFound
    :TODO fix format data duplication for v1/utils format for error response
    """
    if request.META.get('CONTENT_TYPE') == 'application/json':
        response = JsonResponse(status=code, data={'results': {'code': code, 'msg': message}})
    else:
        try:
            template = loader.get_template(template_name)
        except TemplateDoesNotExist:
            template = Template(message)
        response = HttpResponseNotFound(template.render(RequestContext(request)))

    return response


def e500(request, template_name='500.html'):
    return json_html_response(request, template_name, 500, 'Internal Server Error')


def e404(request, template_name='404.html'):
    return json_html_response(request, template_name, 404, 'Not Found')


def csrf_failure(request, reason=""):
    logger.error('error 403: ' + str(request))
    return json_html_response(request, '403.html', 403, 'Forbidden')