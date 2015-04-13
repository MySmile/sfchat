/**
 * onload/home/home.js: Onload event runs in home.home.html template
 */
require(['jquery', 'sfchat/sfchat', 'events/gatracking', 'ga'], function($, sfchat, eventGaTracking) {

    "use strict";

    $(document).ready(function() {
        var homeOptions = sfchat.getOnloadOptions('.onload-js-options',
            ['buttonTarget.createChat', 'buttonTarget.joinChat']);

        eventGaTracking.eventBtnClick(
            homeOptions['buttonTarget']['createChat'], 'create new chat'
        );
        eventGaTracking.eventBtnClick(
            homeOptions['buttonTarget']['joinChat'], 'join to chat'
        );
    });
});
