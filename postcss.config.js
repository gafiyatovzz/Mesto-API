/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({ // подключили cssnano
      preset: 'default', // выбрали настройки по умолчанию
    }),
  ],
};
