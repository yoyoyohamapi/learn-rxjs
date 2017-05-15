const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [];

if (process.node.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));

    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

plugins.push(new HtmlWebpackPlugin({
    filename: './index.html',
    template: './src/template/index.html'
}));

module.exports = {
    entry: './src/main.js',
    output: {
        publicPath: config.publicPath, // 服务器路径
        path: path.resolve(__dirname + config.publicPath),
        filename: '[name].js?[hash]'
    },
    module: {
        loaders: [{
            test: /\.js(x)*$/,
            exclude: /^node_modules$/,
            loader: 'babel'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css/,
            exclude: /^node_modules$/
            loader: `style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }`
        }, {
            test: /\.less/,
            exclude: /^node_modules$/,
            loader: `style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions']}!less-loader`
        }, {
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            loader: 'url?limit=2000&name=[name].[ext]'
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|git|appache)(\?|$)/,
            exclude: /^node_modules$/,
            laoder: 'file-loader?name=[name].[ext]'
        }]
    },
    plugins,
    externals: {
        "ramda": "R",
        "vue": "Vue",
        "vue-router": "VueRouter",
        "vuex": "Vuex"
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.jsx']
    }
}
