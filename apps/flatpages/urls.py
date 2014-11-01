from django.conf.urls import patterns, url

from apps.flatpages.views import FlatpagesView


urlpatterns = patterns('',
    url(r'^(?P<template_name>(privacy|faq|license).html)$', FlatpagesView.as_view()),
)
