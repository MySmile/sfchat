/**
 * onload/home/home.js: Onload event runs in home.home.html template
 */
require(['jquery', 'sfchat/sfchat', 'sfchat/bootstrap'], function($, sfchat, bootstrap) {

    "use strict";

    $(document).ready(function() {
        var chatOptions = sfchat.getOnloadOptions('.onload-js-options', [
            'chatBootstrap.endPoint',
            'chatBootstrap.userToken',
            'chatBootstrap.chatStatus'
        ]);

        new bootstrap(chatOptions['chatBootstrap']);
    });

});
