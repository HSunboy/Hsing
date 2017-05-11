const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.json']
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
        // publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [

  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: [
                    ['es2015', { modules: false }]
        ],
        plugins: ['syntax-dynamic-import']
      }

    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000
      }
    }]
  }

}
