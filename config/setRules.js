module.exports = () => {
  return {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
          ],
        },
      },
    ],
  };
};
