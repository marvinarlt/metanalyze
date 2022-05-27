/**
 * @returns {string}
 */
export function getBrowserLocale(): string {
  if (typeof navigator.languages !== 'undefined') {
    return navigator.languages[0];
  }

  return navigator.language;
}

/**
 * @param {string} locale
 * @returns {void}
 */
export function saveLocale(locale: string): void {
  localStorage.setItem('locale', locale);
}

/**
 * @returns {string | null}
 */
export function getSavedLocale(): string | null {
  return localStorage.getItem('locale');
}

/**
 * 
 * @returns 
 */
export function getClientLocale(): string {
  const savedLocale = getSavedLocale();

  if (typeof savedLocale === 'string') {
    return savedLocale;
  }

  const browserLocale = getBrowserLocale();

  saveLocale(browserLocale);
  
  return browserLocale
}