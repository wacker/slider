const path = require('path');

module.exports = {
	entry: './main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool: process.argv.indexOf('-p') === -1 ? 'cheap-module-eval-source-map' : false,
	module: {
		rules: [{
			test: /.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: [ 'es2015', 'react' ]
			},
		}, {
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ],
		}]
	}
};
