export function useValidation() {
  /**
   * Validate URL
   * 
   * @param {string} value
   * @returns {boolean}
   */
  const isUrl = (value: string): boolean => {
    try {
      new URL(value);
    } catch (error) {
      return false;
    }

    return true;
  }

  return {
    isUrl
  }
}