const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./**/*.tsx', './**/*.html'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    require('autoprefixer'),
    ...(true // process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []),
    require('postcss-csso'),
  ],
};
