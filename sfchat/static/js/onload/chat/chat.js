/**
 * onload/home/home.js: Onload event runs in home.home.html template
 */
require(['jquery', 'sfchat/errorHandler', 'sfchat/sfchat', 'sfchat/bootstrap'], function($, errorHandler, sfchat, bootstrap) {

    "use strict";

    $(document).ready(function() {
        var chatOptions = sfchat.getOnloadOptions('.onload-js-options', [
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
