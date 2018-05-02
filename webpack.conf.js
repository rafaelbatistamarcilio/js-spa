const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin =  require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack_rules = [];

let cssLoader = {
    test: /\.css$/,
    use: [{
            loader: "style-loader"
        },
        {
            loader: "css-loader"
        }
    ]
};

webpack_rules.push(cssLoader);

let babelLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader"
    }
};

webpack_rules.push(babelLoader);

const webpackOption = {
    entry:  [
            'babel-polyfill',
            'whatwg-fetch',
            '@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce',
            'jquery',
            'popper.js',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.min.css',
            '@fortawesome/fontawesome/styles.css',
            '@fortawesome/fontawesome',
            "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[hash].app.js",
    },
    module: {
        rules: webpack_rules
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            {
                from: './src/app/favicon.ico'
            },
            {
                from: './src/app/components/**/*.html',
                to: './components',
                flatten: true
            }
        ]),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            extractComments:true
        }),
        new HtmlWebpackPlugin({
            template: './src/app/index.html'
        })
    ]
};
module.exports = webpackOption;