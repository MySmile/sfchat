/**
 * base.js: Base module
 */
require(['requirejs-config'], function (requirejsConfig) {

    "use strict";

    require([
        'jquery',
        'sfchat/errorHandler',
        'sfchat/sfchat',
        'events/gatracking',
        'ga'
    ], function ($, errorHandler, sfchat, eventGaTracking) {
        $(document).ready(function () {
            var baseOptions = sfchat.getOnloadOptions('.onload-js-options', [
                'googleAnalytics.debugMode',
                'googleAnalytics.trackingId',
                'errorHandler.targetError',
                'errorHandler.hideClass',
                'errorHandler.targetHeader',
                'errorHandler.errorHeaderClass',
                'buttonTarget.createChat',
                'buttonTarget.joinChat'
            ]);

            // debug mode
            sfchat.debugmode = baseOptions['googleAnalytics']['debugMode'];

            // error handler configuration
            errorHandler.init(baseOptions['errorHandler']);
            window.onerror = errorHandler.onError;

            // ga configuration
            ga('create', baseOptions['googleAnalytics']['trackingId'], 'auto');
            ga('send', 'pageview', {
                'anonymizeIp': true
            });

            // button event tracking
            eventGaTracking.eventBtnClick(
                baseOptions['buttonTarget']['createChat'], 'create new chat'
            );
            eventGaTracking.eventBtnClick(
                baseOptions['buttonTarget']['joinChat'], 'join to chat'
            );
        });
    });
});
