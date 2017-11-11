const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        'app.js': './src/entry.js',
        // 'index.html': './views/index.pug',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name]',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                include: /src\/js/,
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?url=false&minimize=true', 'stylus-loader']
                })
            },
            {
                test: /.ts$/,
                loaders: ['ts-loader']
            },
            {
                test: /.pug$/,
                loaders: ['pug-loader']
            },
            {
                test: /.html$/,
                loaders: ['raw-loader']
            },
            {
                test: /\.txt$/,
                loaders: ['raw-loader']
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: getPath => getPath('[name].css').replace('js.css', 'css'),
            allChunks: true
        }),
    ],
}
