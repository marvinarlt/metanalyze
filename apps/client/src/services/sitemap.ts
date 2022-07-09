export default class Sitemap {
  /**
   * @private
   * 
   * @var {string[]} internalUrls
   */
  private internalUrls: string[];

  /**
   * @public
   * @constructor
   * 
   * @param {string[]} internalUrls
   */
  public constructor(internalUrls: string[]) {
    this.internalUrls = internalUrls;
  }

  public generate() {
    // TODO: Generate sitemap
  }
}