var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}
requirejs.config({
    baseUrl: '/base/',

    map: {
        '*': {
            api: 'sfchat/static/js/app/sfchat/api/v1',
            events: 'sfchat/static/js/app/sfchat/events',
            sfchat: 'sfchat/static/js/app/sfchat',
            fixtures: 'bin/jasmine/tests/fixtures',
            'jasmine-ajax': 'bin/jasmine/node_modules/jasmine-ajax/lib/mock-ajax'
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
        'jquery': 'sfchat/static/bower_components/jquery/dist/jquery.min',
        'text': 'bin/jasmine/node_modules/requirejs-text/text',
        'ga': 'bin/jasmine/tests/fixtures/ga'
    },
    deps: tests,
    callback: window.__karma__.start
});
