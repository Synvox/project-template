const path = require('path')
const webpack = require('webpack')
const OfflinePlugin = require('offline-plugin')
const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  debug: DEBUG ? true : false,
  devtool: DEBUG ? '#inline-source-map' : 'source-map',
  entry: {
    app: './client/index.js'
  },
  output: {
    path: path.join(__dirname, 'server/public'),
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      exclude: /node_modules/
    },{
      test: /\.scss$/,
      loaders: ["style", "css?sourceMap", "sass?sourceMap&sourceComments"]
    },{
      test: /\.json$/,
      loader: 'json'
    },{
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      loader: 'file',
      query: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    },{
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }]
  },
  devServer: {
    port: 3031,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  plugins: [
    ()=>new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(DEBUG?'development':'production')
      }
    }),
    ()=>DEBUG && new webpack.optimize.OccurenceOrderPlugin(),
    ()=>DEBUG && new webpack.HotModuleReplacementPlugin(),
    ()=>DEBUG && new webpack.NoErrorsPlugin(),
    ()=>!DEBUG && new OfflinePlugin(),
    ()=>!DEBUG && new webpack.optimize.DedupePlugin(),
    ()=>!DEBUG && new webpack.optimize.UglifyJsPlugin({
      compress: {
        'screw_ie8': true,
        warnings: false
      },
      mangle: {
        'screw_ie8': true
      },
      output: {
        comments: false,
        'screw_ie8': true
      }
    })
  ].map(x=>x()).filter(x=>x)
}
