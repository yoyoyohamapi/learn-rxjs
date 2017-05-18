const webpack = require('webpack');
const path = require('path');
const url = require('url')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const plugins = [];
const publicPath = '';

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
}

plugins.push(new HtmlWebpackPlugin({
    template: './src/index.html'
}));

plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
}));

module.exports = {
    entry: {
        vendor: './src/vendor.js',
        index: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: process.env.NODE_ENV === 'development' ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: process.env.NODE_ENV === 'development' ? '/assets/' : publicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
          },
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
          },
          {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }]
          }
        ]
    },
    plugins,
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        historyApiFallback: {
          index: url.parse(process.env.NODE_ENV === 'development' ? '/assets/' : publicPath).pathname
        }
    },
    devtool: process.env.NODE_ENV === 'development' ? '#eval-source-map' : '#source-map',
    resolve: {
        extensions: ['.js', '.vue']
    }
};
