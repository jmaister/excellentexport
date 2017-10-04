const nodeExternals = require('webpack-node-externals');
const isCoverage = process.env.NODE_ENV === 'coverage';

const path = require('path');

module.exports = {
    entry: "test.html",
    output: {
        filename: "test.build.js",
        path: path.resolve("./testdist/"),
        publicPath: "/tests",
        // use absolute paths in sourcemaps (important for debugging via IDE)
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    module: {
        loaders: [].concat(
            isCoverage ? {
                test: /\.(js|ts)/,
                include: path.resolve('./excellentexport.js'), // instrument only testing sources with Istanbul, after ts-loader runs
                loader: 'istanbul-instrumenter-loader'
            }: [],
            {
                test: /.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            }
        ),
        // ...
    },
    target: 'node',  // webpack should compile node compatible code
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: "source-map"//  "inline-cheap-module-source-map"
};