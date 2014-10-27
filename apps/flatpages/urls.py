from django.conf.urls import patterns, url

from apps.flatpages.views import SFChatFlatpagesView


urlpatterns = patterns('',
    url(r'^(?P<template_name>[a-z]+).html$', SFChatFlatpagesView.as_view()),
)
