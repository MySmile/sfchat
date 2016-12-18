/**
 * base.js: Base module
 */
define([
    'jquery',
    'sfchat/errorHandler',
    'sfchat/sfchat',
    'events/gatracking'
], function ($, errorHandler, sfchat, eventGaTracking) {
    
    "use strict";
    
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

        // error handler configuration
        errorHandler.init(baseOptions['errorHandler']);
        window.onerror = errorHandler.onError;
        
        // ga
        eventGaTracking.init(baseOptions['googleAnalytics']);
        eventGaTracking.eventBtnClick(
            baseOptions['buttonTarget']['createChat'], 'create new chat'
        );
        eventGaTracking.eventBtnClick(
            baseOptions['buttonTarget']['joinChat'], 'join to chat'
        );
    });
});
