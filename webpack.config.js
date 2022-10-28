// vue-demo/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const isEnv = () => process.env.NODE_ENV === 'development'

module.exports = {
    entry: './src/main.js', // 入口文件
    output: { // 输出
        path: path.resolve(__dirname, 'dist'),
        clean: !isEnv(),
        hashDigestLength: 5,
        assetModuleFilename: '[name][contenthash][ext]',
        filename: 'js/[name].[contenthash].js'
    },
    devtool: isEnv() ? 'cheap-module-source-map' : false,
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // 服务器资源的根目录，不写的话，默认为bundle.js
        hot: true, //启用热加载
        host: 'localhost',
        port: 8080, //端口号
        compress: true, // 服务器资源采用gzip压缩
        open: true, // 服务器启动后打开默认浏览器
        historyApiFallback: true, // 解决history模式刷新404
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            "@babel/preset-env"
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-transform-runtime"
                            ]
                        ]
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }, {
                test: /\.scss$/,
                use: [
                    isEnv() ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        require('autoprefixer')
                                    ]
                                ]
                            }

                        }
                    },
                    'sass-loader'
                ]
            }, {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /.jpg|.png|.svg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 10kb以下的资源进行base64转码
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'images/[name][contenthash][ext]'
                }
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true, //折叠空白区域
                removeComments: true, //删除注释
                hash: true, //是否需要对src引的文件后面加上Hash，使用时需要区分开发环境和生产环境
                chunks: [], //允许添加一些额外的文件
                chunksSortMode: 'manual' //chunks的文件顺序注入
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash].css',
            chunkFilename: 'style/[name].[contenthash].css'
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerWebpackPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vender: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
};
