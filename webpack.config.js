'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extension = require('./extension');
const camelCase = require('camelcase');
const capitalize = require('capitalize');
const createEntryFile = require('./createEntryFile');

const entries = {};
const plugins = [];

module.exports = (env) => {
  // Each view becomes its own "app". These are automatically generated based on naming convention.
  ['action', 'configuration'].forEach((type) => {
    const typePluralized = type + 's';
    const delegates =
      type === 'configuration'
        ? [extension['configuration']]
        : extension[typePluralized];

    delegates.forEach((itemDescriptor) => {
      let itemNameCapitalized;
      let chunkName;

      if (itemDescriptor.viewPath) {
        if (type === 'configuration') {
          itemNameCapitalized = 'Configuration';
          chunkName = 'configuration/configuration';
        } else {
          const itemName = itemDescriptor.name;
          const itemNameCamelized = camelCase(itemName);
          itemNameCapitalized = capitalize(itemNameCamelized);
          chunkName = `${typePluralized}/${itemNameCamelized}`;
        }

        const entryPath = `./.entries/${chunkName}.js`;
        createEntryFile(entryPath, itemNameCapitalized, chunkName);
        entries[chunkName] = entryPath;

        plugins.push(
          new HtmlWebpackPlugin({
            title: itemDescriptor.displayName || 'Configuration',
            filename: `${chunkName}.html`,
            template: 'src/view/template.html',
            chunks: ['common', chunkName]
          })
        );
      }
    });
  });

  let minChunks = Math.round(Object.keys(entries).length / 4);
  if (minChunks < 2) {
    minChunks = 2;
  }

  return {
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            name: 'common',
            chunks: 'all',
            minChunks: minChunks
          }
        }
      }
    },
    entry: entries,
    plugins: plugins,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, 'src/view'),
          exclude: /__tests__/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react', '@babel/env'],
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            }
          ]
        },
        {
          test: /\.js$/,
          include: /\.entries/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/env']
              }
            }
          ]
        },
        {
          test: /\.styl/,
          include: path.resolve(__dirname, 'src/view'),
          use: ['style-loader', 'css-loader', 'stylus-loader']
        },
        {
          test: /\.css/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: 'file-loader'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'file-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
