const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  //addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: config => console.dir(config, { depth: null }) || config,
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    // config.module.rules.push({
    //   test: /\.css$/i,
    //   use: ['style-loader', 'css-loader'],
    // });
    config.resolve.extensions.push('.ts', '.tsx');

    // Map dependencies under the context's runfiles, locally maps to:
    //     dist/bin/context/storybook/storybook.sh.runfiles
    // These must defined deps in //context/storybook:storybook
    config.resolve.alias['datafixer/frontend'] = path.resolve(__dirname, '../../../frontend');

    // Return the altered config
    return config;
  },
};
