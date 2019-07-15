
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(__dirname, 'dist');

module.exports = {
   
    entry: './src/App.js',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
 
    module : {
        rules : [    
            {
                test : /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader : "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']   
            }
        ] 
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};