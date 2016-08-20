var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var CSS_PATH = path.resolve(APP_PATH, 'css');

process.env.BABEL_ENV = TARGET;

var common = {
  entry: APP_PATH,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  
  module : {
    loaders : [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: CSS_PATH
      },

      {
        test: /\.jsx?/,
        include: APP_PATH,
        excludes: /(node_modules)/,
        loader: "babel",
        query: {
            presets:['react', 'stage-1']
        }
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET) {
   module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      port : 9000,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        title: 'Kanban app'
      })
    ]
  });
}
