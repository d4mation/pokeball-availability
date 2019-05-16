const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const path = require( 'path' );
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports = {
  entry: [
    './src/entrypoint.js'
  ],
  output: {
    filename: 'dist/js/app.js',
    path: path.resolve( __dirname ),
  },
  devtool: 'source-map', // any "source-map"-like devtool is possible
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // only enable hot in development
                hmr: process.env.NODE_ENV === 'development',
                sourceMap: true,
              },
            },
            {
              loader: "css-loader", // translates CSS into CommonJS
              options: {
                sourceMap: true,
              }
            },
            {
              loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
              options: {
                sourceMap: true,
              }
            }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin( {
      template: "./index.html",
      filename: "index.html",
      inject: false
    } ),
    new MiniCssExtractPlugin( {
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'dist/css/app.css',
      chunkFilename: 'dist/css/[id].css',
    } ),
    new CopyWebpackPlugin( [ 
      {
        from: 'src/images/',
        to: 'dist/images/'
      }
    ] ),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ],
  devServer: {
    contentBase: './',
    // 'Live-reloading' happens when you make changes to code
    // dependency pointed to by 'entry' parameter explained earlier.
    // To make live-reloading happen even when changes are made
    // to the static html pages in 'contentBase', add 
    // 'watchContentBase'
    watchOptions: {
        poll: true
    }
  }
};