
const path = require('path');
const webpackConfig = require('./webpack.config');

// Karma configuration
module.exports = function(config) {
    config.set({

        frameworks: ['mocha'],

        // ... normal karma configuration
        files: [
            // all files ending in ".test"
            {pattern: 'test/index.js', watched: false},
            // each file acts as entry point for the webpack configuration
            {pattern: 'excellentexport.js', watched: true}
        ],

        preprocessors: {
            // add webpack as preprocessor
            'test/index.js': ['webpack', 'sourcemap'],
            'excellentexport.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

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
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'istanbul-instrumenter-loader',
            'karma-mocha',
            'karma-coverage-istanbul-reporter'
        ],

        reporters: ['progress', 'coverage-istanbul'],
        
        coverageIstanbulReporter: {
            // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib 
            reports: ['html', 'text-summary'],
            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name 
            dir: path.join(__dirname, 'coverage'),
            // if using webpack and pre-loaders, work around webpack breaking the source path 
            fixWebpackSourcePaths: true,
            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped` 
            skipFilesWithNoCoverage: false,

            'report-config': {
                // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
                html: {
                    subdir: 'html'
                }
            }
        }
    });
};