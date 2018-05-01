const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin =  require('uglifyjs-webpack-plugin');

const webpack_rules = [{
    test: /\.css$/,
    use: [{
            loader: "style-loader"
        },
        {
            loader: "css-loader"
        }
    ]
}];

const webpackOption = {
    entry:  [
            'babel-polyfill',
            'whatwg-fetch',
            'jquery',
            'popper.js',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.min.css',
            '@fortawesome/fontawesome/styles.css',
            '@fortawesome/fontawesome',
            '@webcomponents/webcomponentsjs/custom-elements-es5-adapter',
            '@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce',
            '@webcomponents/webcomponentsjs/webcomponents-lite',
            "./src/index.js"
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/app.js",
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
        new CopyWebpackPlugin([{
                from: './src/app/index.html'
            },
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
        })
    ]
};
let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader"
    }
};
webpack_rules.push(babelLoader);
module.exports = webpackOption;