var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};