/**
 * Save locale to localStorage.
 * 
 * @param {string} locale
 * @returns {void}
 */
export function saveLocale(locale: string): void {
  localStorage.setItem('locale', locale);
}

/**
 * Get locale from localStorage.
 * 
 * @returns {string | null}
 */
export function getSavedLocale(): string | null {
  return localStorage.getItem('locale');
}

/**
 * Get locale from browsers navigator.
 * 
 * @returns {string}
 */
export function getBrowserLocale(): string {
  if (typeof navigator.languages !== 'undefined') {
    return navigator.languages[0];
  }

  return navigator.language;
}

/**
 * Get saved locale or get locale from browser.
 * 
 * @returns {string}
 */
export function resolveLocale(): string {
  const savedLocale = getSavedLocale();

  if (typeof savedLocale === 'string') {
    return savedLocale;
  }

  const browserLocale = getBrowserLocale();

  saveLocale(browserLocale);
  
  return browserLocale
}