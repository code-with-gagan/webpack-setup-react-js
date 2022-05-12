const port = process.env.PORT || 8080
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCsExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + '/build',
        filename: 'main.[fullhash].js',
        chunkFilename: '[name].bundle.[fullhash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCsExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/'
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
            manifest: "./public/manifest.json",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCsExtractPlugin({
            filename: '[name].[fullhash].css',
            chunkFilename: '[name].bundle.[fullhash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
        })
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: 'public',
        //             to: 'images'
        //         }
        //     ]
        // })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        hot: true,
        open: true,
        historyApiFallback: true
    }
}