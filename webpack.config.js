const webpack = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/app/index.tmpl.html"
        // }),
        // new webpack.HotModuleReplacementPlugin()//热加载插件

        // 打包时候用
        // new webpack.optimize.OccurrenceOrderPlugin(), // 为组件分配ID
        new webpack.optimize.UglifyJsPlugin(), // 压缩JS代码
        // new ExtractTextPlugin("style.css") // 分离CSS和JS文件
  ]
}
