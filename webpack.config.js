const { merge } = require('webpack-merge');
const Path = require('path');
const parts = require('./webpack.parts');

const PATHS = {
  base: Path.join(__dirname),
  output: Path.join(__dirname, './dist'),
  source: Path.join(__dirname, './src'),
  fixed: ''
}

const commonConfigs = () => ({
  target: 'web',
  context: PATHS.source,
  output: {
    path: PATHS.output,
    publicPath: PATHS.fixed,
    filename: '[name].js',
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  entry: {
    main: './app/App.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux'
    ],
    styles: [
      './stylesheet/styles.scss'
    ]
  }
});

const baseConfigs = () => merge([
  commonConfigs(),
  parts.loadHtml(),
  parts.loadJavaScript({ exclude: /node_modules/ }),
  parts.loadOther(),
  parts.loadResolver({
    alias : {
      '@app': Path.resolve(__dirname, './src/app/'),
      '@assets': Path.resolve(__dirname, './src/assets/'),
      '@config': Path.resolve(__dirname, './src/config/'),
      '@shared': Path.resolve(__dirname, './src/app/shared/'),
      '@core': Path.resolve(__dirname, './src/app/core'),
    }
  }),
  parts.copyPlugin({
    patterns: [
      { from: 'assets', to: 'assets' },
      'robots.txt',
      'manifest.json'
    ]
  })
]);

const productionConfig = () => merge([
  parts.cleanBuild(PATHS.output),
  {
    output: {
      filename: '[name].[contenthash].js',
    },
  },
  parts.loadProdCss(),
  parts.minifyJs(),
  parts.minifyCss({
    options: {
      discardComments: {
        removeAll: true
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true
    }
  }),
]);

const developmentConfig = () => merge([
  parts.loadDevCss({ options: { sourceMap: true }}),
  parts.devServer({
    // Customize host/port here if needed
    host: 'localhost',
    port: 3000,
  })
]);

module.exports = (env) => {
  const mode = env && env.NODE_ENV ? env.NODE_ENV : 'development';
  const modeConfigs = (mode === 'development') ? developmentConfig() : productionConfig();
  return merge(
    baseConfigs(),
    parts.setEnvVariables(mode),
    modeConfigs,
    { mode: mode === 'development' ? mode : 'production' }
  );
};
