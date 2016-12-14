module.exports = function (config) {
    var configuration = {

        basePath : '../../..',

        files : [
            {pattern: 'sfchat/static/js/app/sfchat/**/*.js', included: false},
            {pattern: 'bin/jasmine/node_modules/jquery/dist/jquery.min.js', included: false},
            {pattern: 'bin/jasmine/node_modules/jasmine-ajax/lib/mock-ajax.js', included: false},
            {pattern: 'bin/jasmine/tests/specs/**/*Spec.js', included: false},
            {pattern: 'bin/jasmine/tests/fixtures/**/*.html', included: false},
            {pattern: 'bin/jasmine/tests/fixtures/**/*.js', included: false},
            {pattern: 'bin/jasmine/node_modules/requirejs-text/text.js', included: false},
            
            {pattern: 'bin/jasmine/tests/requirejs-config.js', included: true}
        ],

        autoWatch : true,

        frameworks: ['jasmine-jquery', 'jasmine', 'requirejs'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-jasmine-jquery',
            'karma-requirejs',
            'karma-junit-reporter'
        ],

        preprocessors: {
            'sfchat/static/js/app/sfchat/**/*.js': 'coverage'
        },

        reporters: ['progress', 'coverage'],
        
        coverageReporter: {
            type : 'html',
            dir : 'bin/jasmine/coverage/'
        },

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    };

    if (process.env.TRAVIS) {
        configuration.coverageReporter = {
           type: 'lcovonly',
           dir : './coverage/',
           subdir: '.'
        }
    }

    config.set(configuration);
};
