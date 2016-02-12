module.exports = function() {
    var client = './css';

    var server = './src/server/';
    var temp = './.tmp/';

    var config = {

        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        client: client,
        css: temp + 'styles.css',
        index:'index.html',
        sass: client + '/app.scss',
        server: server,
        temp: client,

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Bower and NPM locations
         */


        /**
         * Node settings
         */
        defaultPort: 7203,


    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
