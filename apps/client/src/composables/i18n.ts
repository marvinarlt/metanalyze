import { useI18n as useI18nDependency } from 'vue-i18n';
import { saveLocale, resolveLocale } from '@app/services/i18n';

export function useI18n() {
  const i18n = useI18nDependency();

  /**
   * Set locale and save it.
   * 
   * @param {string} locale
   * @returns {void}
   */
  const setLocale = (locale: string): void => {
    i18n.locale.value = locale;

    saveLocale(locale);
  }

  /**
   * Get locale.
   * 
   * @returns {string}
   */
  const getLocale = (): string => {
    return resolveLocale();
  }

  return {
    setLocale,
    getLocale
  };
}