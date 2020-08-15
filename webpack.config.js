'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs');

module.exports = (env, argv) => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);
    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';
    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;
    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;
    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;
    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});
    return {
        performance: { hints: false },
        entry: path.resolve(__dirname, 'src/index.js'),
        devtool: argv.mode === 'development' ? 'inline-source-map' : 'none',
        resolve: {
            extensions: ['jsx', '.js'],
            alias: {
                resources: path.resolve(__dirname, 'resources'),
                src: path.resolve(__dirname, 'src'),
                components: path.resolve(__dirname, 'src/components'),
                services: path.resolve(__dirname, 'src/services'),
                media: path.resolve(__dirname, 'src/media'),
                containers: path.resolve(__dirname, 'src/containers')
            }
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve('build'),
            publicPath: '/'
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
                    include: path.resolve(__dirname, '../')
                },
                {
                    test: /\.(svg)$/,
                    use: ['@svgr/webpack']
                },
                {
                    test: /\.(jpg|png|gif|ico|ttf|woff|woff2|eot)(\?.*)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                output: {
                                    path: path.join(__dirname, 'build')
                                }
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            port: 9000,
            hot: true,
            historyApiFallback: true,
            proxy: {
                '/api': 'localhost:5000'
            }
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'index.html')
            })
        ]
    };
};
