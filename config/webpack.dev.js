const path = require('path');
const moduleRules = require('./webpack.rules');

module.exports = (env, args) => {
  const prepared = moduleRules(args);
  const config = {
    devServer: {
      compress: true,
    },
    mode: 'development',
    entry: prepared.entry,
    output: {
      jsonpFunction: `webpackJsonp${Date.now()}`,
      path: path.resolve(__dirname, '../dist'),
      filename: 'index.js',
      library: 'asyncLoaderCDN',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'this',
      pathinfo: false,
    },
    devtool: 'eval-source-map',
    optimization: prepared.optimization,
    module: prepared.rules,
    plugins: prepared.plugins,
  };

  return config;
};
