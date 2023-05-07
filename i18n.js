const i18next = require('i18next')
const i18nextMiddleware = require('i18next-http-middleware')
const Backend = require('i18next-fs-backend')
const path = require('path')
const fs = require('fs')

// const enTranslation = JSON.parse(fs.readFileSync('./locales/en.json', 'utf8'))
// const ruTranslation = JSON.parse(fs.readFileSync('./locales/ru.json', 'utf8'))

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'ru',
    detection: {
      order: ['cookie'],
      caches: ['cookie'],
      lookupCookie: 'i18next',
    },
    resources: {
      en: {
        translation: {
          notAuth: 'Not authorized',
          required: 'Please fill in the required fields',
          invalid: 'Invalid email or password entered',
          alreadyExists: 'User with this e-mail already exists',
          failCreate: 'Failed to create user',
          failGetEmplAll: 'Failed to get employees',
          requiredAll: 'All fields are required',
          failDelEmpl: 'Failed to remove employee',
          failEditEmpl: 'Failed to edit employee',
          failGetEmpl: 'Failed to get employee',
        },
      },
      ru: {
        translation: {
          notAuth: 'Не авторизован',
          required: 'Пожалуйста, заполните обязятельные поля',
          invalid: 'Неверно введен email или пароль',
          alreadyExists: 'Пользователь с таким e-mail уже существует',
          failCreate: 'Не удалось создать пользователя',
          failGetEmplAll: 'Не удалось получить сотрудников',
          requiredAll: 'Все поля обязательные',
          failDelEmpl: 'Не удалось удалить сотрудника',
          failEditEmpl: 'Не удалось редактировать сотрудника',
          failGetEmpl: 'Не удалось получить сотрудника',
        },
      },
    },
  })

const languageDetector = i18nextMiddleware.LanguageDetector
const i18nMiddleware = i18nextMiddleware.handle(i18next, {
  fallbackLng: 'ru',
  detection: {
    order: ['cookie'],
    caches: ['cookie'],
    lookupCookie: 'i18next',
  },
})

// i18next.use(
//   i18nextMiddleware.handle(i18next, {
//     fallbackLng: 'ru',
//     // Конфигурация детектора языка, который будет использовать куки для определения выбранного языка.
//     detection: {
//       order: ['cookie'],
//       caches: ['cookie'],
//       lookupCookie: 'i18next', // Название куки, содержащего выбранный язык.
//     },
//   })
// )

module.exports = i18next