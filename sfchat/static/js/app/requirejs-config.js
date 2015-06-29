/**
 * requirejs-config.js: RequireJS configuration
 */

require.config({
    baseUrl: '/static/js/app',
    map: {
        '*': {
            api: 'sfchat/api/v1',
            events: 'sfchat/events'
        }
    },

    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'ga': {
            exports: 'ga'
        }
    },
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'ga': '//www.google-analytics.com/analytics'
    }
});
