module.exports = function (config) {
    config.set({

        basePath : '../../..',

        files : [
            {pattern: 'sfchat/static/bower_components/jquery/dist/jquery.min.js', included: false},
            {pattern: 'sfchat/static/js/app/sfchat/**/*.js', included: false},
            {pattern: 'bin/jasmine/tests/specs/**/*Spec.js', included: false},
            {pattern: 'bin/jasmine/tests/fixtures/**/*.html', included: false},
            {pattern: 'bin/jasmine/node_modules/requirejs-text/text.js', included: false},
            
            {pattern: 'bin/jasmine/tests/requirejs-config.js', included: true}
        ],

        autoWatch : true,

        frameworks: ['jasmine-jquery', 'jasmine', 'requirejs'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-jquery',
            'karma-requirejs',
            'karma-junit-reporter'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
