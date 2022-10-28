const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 为了代码简洁，在这里封装了一下
const cssTest = /\.css$/
const lessTest = /\.less$/
const cssModuleTest = /\.module\.css$/
const lessModuleTest = /\.module\.less$/
const baseCssUse = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader'
]
const baseCssModuleUse = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: "[name]_[local]__[hash:5]"
            }
        },
    },
    'postcss-loader'
]

module.exports = {
    entry: { // 入口配置
        app: './src/index.jsx'
    },
    output: { // 出口配置
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[contenthash:8].js',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
        // 表示引用文件时如果没带后缀会按照此顺序依次查找
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            hash: false
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].css',
            ignoreOrder: true,
        }),
        new webpack.DefinePlugin({
            VERSION_H5: +new Date(), // 这里添加了VERSION_H5
            'process.env': Object.keys(process.env).reduce(
                (env, key) => {
                    env[key] = JSON.stringify(process.env[key]);
                    return env;
                },
                {}
            )
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                options: {
                    cacheDirectory: true
                },
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader']
            },
            {
                test: cssTest,
                exclude: cssModuleTest,
                use: baseCssUse
            },
            {
                test: lessTest,
                exclude: lessModuleTest,
                use: [...baseCssUse, 'less-loader']
                // rules里的use数组在解析时是按从右往左解析的，需要注意顺序。
            },
            {
                test: cssModuleTest,
                use: baseCssModuleUse
            },
            {
                test: lessModuleTest,
                use: [...baseCssModuleUse, 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                options: {
                    esModule: false,
                    limit: 4096, // 配置低于4k的图片会转为base64格式
                },
                loader: 'url-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                options: {
                    esModule: false
                },
                loader: 'file-loader',
            },
        ]
    }
}