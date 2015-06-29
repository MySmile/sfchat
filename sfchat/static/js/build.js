{
    baseUrl: './app',
    dir: './build',
    mainConfigFile: 'app/requirejs-config.js',
    modules: [{
            name: 'requirejs-config'
        }, {
            name: 'base',
            include: ['jquery', 'sfchat/errorHandler', 'sfchat/sfchat', 'events/gatracking'],
            exclude: ['requirejs-config']
        }, {
            name: 'chat',
            include: ['jquery', 'sfchat/errorHandler', 'sfchat/sfchat', 'sfchat/bootstrap'],
            exclude: ['requirejs-config']
        }],
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'ga': 'empty'
    }
}
