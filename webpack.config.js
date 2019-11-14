const path = require('path');

module.exports = {
    entry: './excellentexport.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'excellentexport.js',
        library: 'ExcellentExport',
        libraryTarget: 'umd',
        libraryExport: 'default',
        auxiliaryComment: 'ExcellentExport.js'
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
};
