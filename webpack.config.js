const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    context: __dirname + "/",
    entry: "./excellentexport.js",
    output: {
        path: __dirname + "/dist",
        filename: "excellentexport.js",
        library: "ExcellentExport",
        libraryTarget: "umd",
        libraryExport: 'default'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new UglifyJsPlugin({ minimize: true })
    ]
};
