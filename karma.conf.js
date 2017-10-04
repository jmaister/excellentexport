
const webpackConfig = require('./webpack.config');

// Karma configuration
module.exports = function(config) {
    config.set({

        frameworks: ['mocha'],

        // ... normal karma configuration
        files: [
            // all files ending in "_test"
            {pattern: 'test/index.js', watched: false}
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            'test/index.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig /*{
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            devtool: 'inline-source-map'
        }*/,

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false
            }
        },

        plugins: [
            require("karma-webpack"),
            'karma-babel-preprocessor',
            'karma-sourcemap-loader',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'istanbul-instrumenter-loader',
            'karma-mocha'
        ]
    });
};