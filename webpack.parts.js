const Webpack = require('webpack');
const Path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenv = require('dotenv');
const fs = require('fs');

exports.setEnvVariables = (mode = '') => {
  const envDefault = `${Path.join(__dirname)}/.env`
  let envPath = `${envDefault}.${mode}`;
  if (!fs.existsSync(envPath)) {
    envPath = envDefault;
  }
  const envParsed = dotenv.config({ path: envPath }).parsed;
  const envKeys = Object.keys(envParsed).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envParsed[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new Webpack.EnvironmentPlugin(Object.keys(envParsed).map(key => key)),
      new Webpack.DefinePlugin(envKeys)
    ]
  };
};

exports.loadHtml = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ]
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include,
        exclude,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      // add the version of browsers list you want
                     browsers: ['> 1%, not dead'],
                    },
                    useBuiltIns: 'usage',
                    corejs: 3
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        // loader: 'source-map-loader'
      },
    ]
  }
});

exports.loadDevCss = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include,
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options
          },
          'sass-loader'
        ]
      }
    ]
  }
});

exports.loadProdCss = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include,
        exclude,
        use: [
          'style-loader', // Fallback
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
});

exports.loadOther = () => ({
  module: {
    rules: [
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: ['@svgr/webpack'] },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
    ]
  }
});

exports.loadResolver = ({ alias } = {}) => ({
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
    mainFields: ['browser', 'main'],
    alias
  }
});

exports.copyPlugin = ({ patterns } = {}) => ({
  plugins: [
    new CopyWebpackPlugin({
      patterns
    })
  ]
});

exports.minifyJs = () => ({
  plugins: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 2015,
      }
    })
  ]
});

exports.minifyCss = ({options}) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

exports.cleanBuild = (path) => ({
  plugins: [
    new CleanWebpackPlugin()
  ]
});

exports.devServer = ({ host, port } = {}) => ({
  devtool: 'eval',
  devServer: {
    contentBase: Path.join(__dirname, './src'),
    hot: true,
    host,
    port,
    compress: true,
    inline: true,
    historyApiFallback: true,
    watchContentBase: true
  }
});
