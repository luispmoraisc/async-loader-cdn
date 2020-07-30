const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = () => {
  return {
    minimizer: [new TerserJSPlugin({})],
  };
};
