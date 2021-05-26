const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = ({ config }) => {
  config.resolve.modules = ['node_modules', path.resolve('./node_modules')];
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            sourceMap: true,
            plugins: [autoprefixer],
          },
        },
      },
      'stylus-loader',
    ],
  });

  return config;
};
