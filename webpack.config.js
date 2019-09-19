const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template.html',
        }),
        // new CircularDependencyPlugin({
        //     // exclude detection of files based on a RegExp
        //     exclude: /node_modules/,
        //     // add errors to webpack instead of warnings
        //     failOnError: true,
        //     // allow import cycles that include an asyncronous import,
        //     // e.g. via import(/ webpackMode: "weak" / './file.js')
        //     allowAsyncCycles: true,
        //     cwd: process.cwd(),
        // }),
    ],
};
