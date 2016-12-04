var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}
requirejs.config({
    baseUrl: 'base/',

    map: {
        '*': {
            api: 'sfchat/static/js/app/sfchat/api/v1',
            events: 'sfchat/static/js/app/sfchat/events',
            fixtures: 'bin/jasmine/tests/fixtures'
        }
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        }
    },
    paths: {
        'jquery': 'sfchat/static/bower_components/jquery/dist/jquery.min',
        'text': 'bin/jasmine/node_modules/requirejs-text/text'
    },
    deps: tests,
    callback: window.__karma__.start
});
