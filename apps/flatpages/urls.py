from django.conf.urls import url
from django.views.decorators.cache import cache_page

from apps.flatpages.views import FlatpagesView


urlpatterns = [
    url(r'^(?P<template_name>(privacy|faq|license).html)$', cache_page(None)(FlatpagesView.as_view())),
]
