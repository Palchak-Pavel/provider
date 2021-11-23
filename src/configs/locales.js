const locale = 'ru'

export default {
  // current locale
  locale,

  // when translation is not available fallback to that locale
  fallbackLocale: 'en',

  // availabled locales for user selection
  availableLocales: [{
    code: 'en',
    flag: 'us',
    name: 'English',
    file: 'en.js'
  },  {
    code: 'ru',
    flag: 'ru',
    name: 'русский',
    file: 'ru.js'
  },
  ]
}
