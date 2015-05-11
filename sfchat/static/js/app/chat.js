/**
 * chat.js: Chat module
 */
require(['requirejs-config'], function (requirejsConfig) {

    "use strict";

    require([
        'jquery',
        'sfchat/errorHandler',
        'sfchat/sfchat',
        'sfchat/bootstrap'
    ], function ($, errorHandler, sfchat, bootstrap) {
        $(document).ready(function () {
            var chatOptions = sfchat.getOnloadOptions('.onload-js-options', [
                'googleAnalytics.debugMode',
                'chatBootstrap.endPoint',
                'chatBootstrap.userToken',
                'chatBootstrap.chatStatus',
                'errorHandler.targetError',
                'errorHandler.hideClass',
                'errorHandler.targetHeader',
                'errorHandler.errorHeaderClass'
            ]);

            // debug mode
            sfchat.debugmode = chatOptions['googleAnalytics']['debugMode'];

            // error handler configuration
            errorHandler.init(chatOptions['errorHandler']);
            window.onerror = chatOptions.onError;

            new bootstrap(chatOptions['chatBootstrap']);
        });
    });
});
