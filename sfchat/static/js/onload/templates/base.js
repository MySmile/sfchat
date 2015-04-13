/**
 * onload/templates/base.js: Onload event runs in base template
 */
require(['jquery', 'sfchat/errorHandler', 'sfchat/sfchat', 'onload/ga'], function($, errorHandler, sfchat) {

    "use strict";

    $(document).ready(function() {
        var gaOptions = sfchat.getOnloadOptions('.onload-js-options', [
            'googleAnalytics.debugMode',
            'googleAnalytics.trackingId',
            'errorHandler.targetError',
            'errorHandler.hideClass',
            'errorHandler.targetHeader',
            'errorHandler.errorHeaderClass'
        ]);

        // debug mode
        sfchat.debugmode = gaOptions['googleAnalytics']['debugMode'];

        // error handler configuration
        errorHandler.init(gaOptions['errorHandler']);
        window.onerror = errorHandler.onError;

        // ga configuration
        ga('create', gaOptions['googleAnalytics']['trackingId'], 'auto');
        ga('send', 'pageview', {
          'anonymizeIp': true
        });
    });
});
