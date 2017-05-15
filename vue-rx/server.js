const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const config = require('./config');

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    publicPath: config.publicPath,
    stats: {
        color: true
    },
    proxy: {
        '*': {
            target: config.target,
            changeOrigin: true
        }
    }
});

server.listen(3000, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('http://localhost:3000' + config.publicPath);
})
