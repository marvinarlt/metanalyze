export default class Validate {
  /**
   * Validate URL.
   * 
   * @param {string} url
   * @returns {boolean}
   */
  public static url(url: string): boolean {
    try {
      let urlInstance = new URL(url);

      if (! ['http:', 'https:'].includes(urlInstance.protocol)) {
        return false;
      }
    } catch (error) {
      return false;
    }

    return true;
  }
}