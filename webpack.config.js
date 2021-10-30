const path = require('path');

module.exports = {
    entry: './src/excellentexport.ts',
    // devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'excellentexport.js',
        library: 'ExcellentExport',
        libraryTarget: 'umd',
        libraryExport: 'default',
        auxiliaryComment: 'ExcellentExport.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
};
