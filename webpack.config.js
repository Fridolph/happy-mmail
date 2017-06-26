var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 获取html-webpack-plugin参数的方法
 */
var getHtmlConfig = function(name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    // inject: true,
    // hash: true,
    chunks: ['base', name]
  }
}
// 环境变量配置 dev / prd
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// webpack config
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js']
  },
  output: {
    path: './dist', // 生成文件的目录
    filename: 'js/[name].js',
    publicPath: '/dist' // view下引用路径的目录
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=10000&name=resource/[name].[ext]'        
      }
    ]
  },
  resolve: {
    alias: {
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      image: __dirname + '/src/image',
      view: __dirname + '/src/view',
      service: __dirname + '/src/service'
    }
  },
  plugins: [
    // 独立通用模块打包到 js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'base',
      filename: 'js/base.js'      
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin('css/[name].css'),
    // html模版的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
}

if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;
