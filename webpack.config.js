'use strict';

const path = require('path');
const apiMocker = require('webpack-api-mocker');

module.exports = (env, argv) => {
    return {
        performance: { hints: false },
        mode: argv.mode,
        entry: path.resolve(__dirname, 'src/index.js'),
        devtool: argv.mode === 'development' ? 'inline-source-map' : 'none',
        resolve: {
            extensions: ['jsx', '.js'],
            alias: {
                resources: path.resolve(__dirname, 'resources'),
                src: path.resolve(__dirname, 'src'),
                components: path.resolve(__dirname, 'src/components'),
                containers: path.resolve(__dirname, 'src/containers'),
                services: path.resolve(__dirname, 'src/services'),
            },
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve('server/static'),
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(css|scss)$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader'],
                    include: path.resolve(__dirname, '../'),
                },
                {
                    test: /\.(jpg|png|gif|ico|ttf|woff|woff2|eot)(\?.*)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                output: { path: path.join(__dirname, 'build') },
                            },
                        },
                    ],
                },
            ],
        },
        devServer: {
            before(app) {
                apiMocker(app, path.resolve('./mockers/index.js'), {});
            },
            port: 9000,
            hot: true,
            historyApiFallback: true,
        },
    };
};
