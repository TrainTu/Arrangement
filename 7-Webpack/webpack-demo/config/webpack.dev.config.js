const merge = require("webpack-merge")
const common = require("./webpack.base.config")
const webpack = require('webpack')

console.log("环境变量 MY_TYPE",process.env.MY_TYPE)

module.exports = merge(common, {
    mode: "development",
    // devtool: 'cheap-module-eval-source-map',
    output: {
        filename: "js/[name].js",
        chunkFilename: 'js/[name].js',
    },
    devServer: {
        open: true,
        port: 9000,
        compress: true,
        hot: true,
        inline: true,
        proxy: {
            '/proxy': {
                target: 'https://192.111:8800',
                ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/proxy': ''
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
})

