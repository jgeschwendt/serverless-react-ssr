const CircularDependencyPlugin = require('circular-dependency-plugin')
const path = require('path')
const slsw = require('serverless-webpack')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const config = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.resolve(process.cwd(), '.webpack'),
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: process.env.NODE_ENV === 'production'
    }),
  ],
  resolve: {
    extensions: [
      '.gql',
      '.graphql',
      '.json',
      '.ts',
      '.tsx',
    ],
    modules: [
      path.resolve(process.cwd(), 'node_modules'), 'node_modules',
      'src/app'
    ],
  },
}

// patch serverless-offline, lambda always returns :UTC for the TZ and is a reserved variable
if (slsw.lib.webpack.isLocal) {
  config.plugins.push(new webpack.DefinePlugin({ 'process.env.TZ': JSON.stringify(':UTC') }))
}

module.exports = config
