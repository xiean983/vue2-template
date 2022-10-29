const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const baseWebpackConfig = require('./webpack.base.conf');
const { merge } = require('webpack-merge');
module.exports = merge(baseWebpackConfig,{
  output: {
    filename: "[name].[contenthash].js", //设置打包出来的js的文件名,生产环境，为了避免每次新部署之后，浏览器缓存，所以要加哈希
    publicPath: "./" // index.html中链接资源，以index.html为基准，定位之前配置的image,style，script
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true, //多线程压缩
        extractComments: false //不要注释
      })
    ]
  },
  performance: {
    hints: false
  }
});
