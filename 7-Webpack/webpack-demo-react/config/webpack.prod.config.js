const merge = require("webpack-merge")
const common = require("./webpack.base.config")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin({
            terserOptions: {
                compress: {
                    pure_funcs: ['console.log'] // 删除 console.log 代码
                }
            }
        })],
        splitChunks: {
            chunks: 'all',
            maxAsyncRequests: 8,
            maxInitialRequests: 6,
            minSize: 10000,
            cacheGroups: {
                reactAndDom: { // 分离react和react-dom
                    name: 'chunk-react',
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // 匹配规则
                    priority: 20 // 匹配优先级
                },
                vendors: { // 其他npm依赖（生产环境）
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common111: { // 组件公共抽离
                    name: 'chunk-common111',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
})