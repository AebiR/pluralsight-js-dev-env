import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackMd5Hash from 'webpack-md5-hash'
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: /*[path.resolve(__dirname, 'src/index')],*/
  {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		//filename: 'bundle.js' //Hard coded name for when only one bundle is generated
		//filename: '[name].js' //Pattern name for when multiple bundles are generated
		filename: '[name].[chunkhash].js' //Pattern name with md5 hash to enable cache busting
  },
  plugins: [
		//Generate external css with hash
		new ExtractTextPlugin('[name].[contenthash].css'),

		//Hash files to generate unique filenames, which force browsers to request the new file
		new WebpackMd5Hash(),

		//USe CommonsChunkPlugin to create sep.
		//bundles of vendor libraries to allow
		//separate caching
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor'
		}),

		//Create HTML file that includes reference to bundled JS
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			showMsg: true,
			myMsg: 'MyMessage'
		}),

		//Eliminate duplicate bundles
		new webpack.optimize.DedupePlugin(),

		//Minify JS
		new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      //{test: /\.css$/, loaders: ['style','css']}
		{test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
