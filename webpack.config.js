var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 获取html-webpack-plugin参数的方法
 */
var getHtmlConfig = function(name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
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
    'login': ['./src/page/login/index.js'],
    'result': ['./src/page/result/index.js']
  },
  output: {
    path: './dist', // 生成文件的目录
    filename: WEBPACK_ENV === 'dev' ? 'js/[name].js' : 'js/[name][chunkhash:8].js',
    publicPath  : WEBPACK_ENV === 'dev' ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/',
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  plugins: [
    // 独立通用模块打包到 js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'      
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin('css/[name].css'),
    // html模版的处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
  ],
  module: {
    loaders: [
      {
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(string)$/,
        loader: 'html-loader'
      },
      { 
        test: /\.(gif|png|jpg|svg)\??.*$/, 
        loader:'url-loader?limit=8192&name=img/[name].[ext]'
      },
      { 
        test: /\.(woff|eot|ttf)\??.*$/, 
        loader:'url-loader?limit=8192&name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      image: __dirname + '/src/image',
      view: __dirname + '/src/view',
      service: __dirname + '/src/service',
      node_modules: __dirname + '/node_modules'
    }
  }  
}

if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
