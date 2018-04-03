var assetsSubDirectory = 'static/';
var path = require('path');
var root = path.resolve(__dirname, '../');
var vueLoaderConfig = require('./vue-loader.conf');

module.exports = {
    devtool: 'source-map',

    entry:  root + "/src/index_global.js",
    output: {
        path: root + "/dist/",
        libraryTarget: 'umd',
        filename: "upload.js"
    },

    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: assetsSubDirectory + 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: root,
                exclude: [
                    path.join(root, '../node_modules/')
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css'//添加对样式表的处理
            }
        ]
    },

    watch: true
}
