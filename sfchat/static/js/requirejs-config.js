/**
 * requirejs-config.js: RequireJS configuration
 */

require.config({
    baseUrl: '/static/js/',
    map: {
        '*': {
            api: 'sfchat/api/v1',
            events: 'sfchat/events'
        }
    },

    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    },
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min'
    }
});