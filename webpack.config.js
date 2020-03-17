const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: {
        template1: './src/template/template1.js',
        template2: './src/template/template2.js',
        template3: './src/template/template3.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'template1.html',
            template: './index.html',
            inject: true,
            chunks: ['template1']
        }),
        new HtmlWebpackPlugin({
            filename: 'template2.html',
            template: './index.html',
            inject: true,
            chunks: ['template2']
        }),
        new HtmlWebpackPlugin({
            filename: 'template3.html',
            template: './index.html',
            inject: true,
            chunks: ['template3']
        }),
        new CopyWebpackPlugin([
            {from: './index.css'},
            {from: './src/img', to: './img'}
        ]),
        new CleanWebpackPlugin(),
    ]
};
