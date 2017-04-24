var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    // CSS
    { 
      test: /\.styl$/, 
      include: path.join(__dirname, 'src'),
      loader: 'style-loader!css-loader!stylus-loader'
    },
        {
            test: /\.css$/, // Transform all .css files required somewhere within an entry point...
            loaders: ['style-loader', 'css-loader']
        },
    //    JSON
        { test: /\.json$/, loader: 'json' },
    //    IMG
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};
