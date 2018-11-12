const LoadablePlugin = require('@loadable/webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require('path')
const webpack = require('webpack')

const pkg = require('../../package.json')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'eval-source-map',
  target: 'web',
  entry: [
    path.resolve(process.cwd(), 'src/platforms/browser/main.ts')
  ],
  externals: [],
  optimization: {
    // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-2
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.(ts|tsx)$/,
        use: [
          { loader: require.resolve('tslint-loader') }
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.(graphql|gql)$/,
        use: [
          { loader: require.resolve('graphql-tag/loader') }
        ]
      },
      {
        exclude: /node_modules/,
        test: /\.(ts|tsx)$/,
        use: [
          { loader: require.resolve('babel-loader') },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin([
      'API_DOMAIN_NAME',
      'APP_DOMAIN_NAME'
    ].reduce((obj, key) => ({ ...obj, [`process.env.${key}`]: JSON.stringify(process.env[key]) }), {}), {
      'process.env.PACKAGE_VERSION': pkg.version
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: true }),
    new LoadablePlugin()
  ],
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.graphql', '.ts', '.tsx'],
    modules: [path.resolve(process.cwd(), 'node_modules'), 'node_modules'],
  },
  devServer: {
    host: process.env.HOST || '0.0.0.0',
    port: 3000,
    proxy: {
      // This proxies the docker website.server service when running `make start`
      '/': 'http://website.server:3001'
    },
    publicPath: '/static/'
  },
};
