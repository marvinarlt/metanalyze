import { createI18n } from 'vue-i18n';
import en from '@app/locales/en.json';
import de from '@app/locales/de.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: { en, de }
});

export default i18n;
