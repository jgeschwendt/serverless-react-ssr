const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require('path')
const slsw = require('serverless-webpack')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'eval-source-map',
  target: 'web',
  entry: {
    main: [
      path.resolve(process.cwd(), 'src/platforms/browser/main.ts')
    ],
  },
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
    new webpack.DefinePlugin(Object.assign({}, Object.keys(process.env).reduce((obj, key) => (
        Object.assign(obj, { [`process.env.${key}`]: JSON.stringify(process.env[key]) })
      ), {}), {
        'process.env.PACKAGE_VERSION': '0.1.0' // JSON.stringify(package.version),
      })),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: true }),
  ],
  resolve: {
    extensions: [
      '.gql',
      '.graphql',
      '.js',
      '.json',
      '.ts',
      '.tsx',
    ],
    modules: [
      path.resolve(process.cwd(), 'node_modules'), 'node_modules',
      'src/app'
    ],
  },
  devServer: {
    host: process.env.HOST || '0.0.0.0',
    port: 3000,
    proxy: {
      // This proxies the docker website.server service when running `make start-website`
      '/': 'http://website.server:3001'
    },
    publicPath: '/static/'
  },
};
