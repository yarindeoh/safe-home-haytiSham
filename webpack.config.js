'use strict';

const path = require('path');
const apiMocker = require('webpack-api-mocker');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env2, argv) => {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;
    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
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
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'index.html'),
            }),
        ],
    };
};
