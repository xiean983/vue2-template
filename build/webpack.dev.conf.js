const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig,{
    output: {
      filename: "[name].[contenthash].js" //设置打包出来的js的文件名
    },
    devServer: {
      // static: "./dist", //执行dist作为根目录,这是本地服务器，打包的内容放置在内存中，然后静态资源指定为这个路径
      contentBase: path.join(__dirname, 'dist'), // 服务器资源的根目录，不写的话，默认为bundle.js
      hot: true, //启用热加载
      host: 'localhost',
      port: 8080, //端口号
      compress: true, // 服务器资源采用gzip压缩
      open: true, // 服务器启动后打开默认浏览器
      historyApiFallback: true, // 解决history模式刷新404
    },
    devtool: "inline-source-map", //映射定位error和warning
    mode: "development" //这里直接设置成开发
  });
  