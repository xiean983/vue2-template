const path = require("path"); //这个是node内置的一个模块，用来操作文件路径的方法
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    entry: {
        index: "./src/main.js", //设置打包入口,相对于命令行执行的目录
    },
    output: {
        path: path.resolve(__dirname, "../dist"), //设置打包的出口,需要是绝对路径，而__dirname是node的一个全局变量，记录当前文件的绝对路径（是这个配置文件在的目录）
        clean: true, //清除上次打包出来的文件
        assetModuleFilename: '[name][contenthash][ext]' //自定义asset module资源打包后的路径和名字
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src')
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
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-runtime"]],
                        //开启缓存
                        cacheDirectory: true
                    }
                },
                exclude: /node_modules/
            }, {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }, {
                test: /\.png$/, //正则匹配到png文件时，执行本策略
                type: "asset/resource", //将其分割为单独的文件，并导出url(w文件路径)
                generator: {
                    filename: "assets/images/[name]_[contenthash][ext]"
                }
            }, {
                test: /\.svg$/,
                type: "asset/inline"
            }, {
                test: /\.txt$/,
                type: "asset/source"
            }, {
                test: /\.jpg$/,
                type: "asset",
                generator: {
                    filename: "assets/images/[name]_[contenthash][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 * 1024 //图片大小4m
                    }
                }
            }, {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 当前的css所在的文件要相对到dist文件夹
                            publicPath: "../../"
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html", //用来做模板的html的文件路径
            filename: "index.html", //生成的html的名字
            inject: "body" //打包出来的那个js文件，放置在生成的body标签内
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[contenthash].css',//配置css打包之后的存放路径
            chunkFilename: 'style/[name].[contenthash].css'
        }),
        new VueLoaderPlugin()
    ],
    optimization: {
        splitChunks: {
            //将第三方的依赖抽离成一个js文件
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    }
};
