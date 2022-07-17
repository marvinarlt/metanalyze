export default class SitemapBuilder {

  /**
   * @private
   * 
   * @var {Sitemap} sitemap
   */
  private sitemap: Sitemap = {};

  /**
   * @public
   * 
   * @param {URL} url
   * @returns {void}
   */
  public add(url: URL): void {
    let pathname = this.trim(url.pathname, '/');
    let splittedPathname = pathname.split('/');
    let pathnameParts = splittedPathname.map(pathname => ('' === pathname) ? 'index' : pathname);
    let lastPathnamePartIndex = pathnameParts.length - 1;
    let currentSitemap = this.sitemap;

    for (let [ pathnamePartIndex, pathnamePart ] of Object.entries(pathnameParts)) {
      if (! (pathnamePart in currentSitemap)) {
        currentSitemap[pathnamePart] = {
          name: pathnamePart,
          hasChildren: false
        }
      }

      let currentSitemapPage = currentSitemap[pathnamePart];

      if (parseInt(pathnamePartIndex) === lastPathnamePartIndex) {
        this.addLastPart(currentSitemapPage, url.toString());
        break;
      }

      if (! currentSitemapPage.hasChildren) {
        this.addPart(currentSitemapPage);
      }

      currentSitemap = currentSitemapPage.children as Sitemap;
    }
  }

  /**
   * @private
   * 
   * @param {SitemapPage} sitemapPage
   * @returns {void}
   */
  private addPart(sitemapPage: SitemapPage): void {
    sitemapPage.hasChildren = true;
    sitemapPage.children = {} as Sitemap;

    if ('url' in sitemapPage) {
      sitemapPage.children = this.addIndexChild(
        sitemapPage.children as Sitemap,
        sitemapPage.url as string
      );

      delete sitemapPage.url;
    }
  }

  /**
   * @private
   * 
   * @param {SitemapPage} sitemapPage
   * @param {string} url
   * @returns {void}
   */
  private addLastPart(sitemapPage: SitemapPage, url: string): void {
    if (! sitemapPage.hasChildren) {
      sitemapPage.url = url;
    } else {
      sitemapPage.hasChildren = true;
      sitemapPage.children = this.addIndexChild(sitemapPage.children as Sitemap, url);
    }
  }

  /**
   * @private
   * 
   * @param {Sitemap} childSitemap
   * @param {string} url
   * @returns {SitemapPage}
   */
  private addIndexChild(childSitemap: Sitemap, url: string) {
    return {
      index: {
        name: 'index',
        url,
        hasChildren: false
      },
      ...childSitemap
    }
  }

  /**
   * @private
   * 
   * @param {string} source
   * @param {string} characters
   * @returns {string}
   */
  private trim(source: string, characters: string): string {
    if (source.startsWith(characters)) {
      source = source.substring(characters.length);
    }

    if (source.endsWith(characters)) {
      source = source.substring(source.length - characters.length, -1);
    }

    if (source.startsWith(characters) || source.endsWith(characters)) {
      source = this.trim(source, characters);
    }

    return source;
  }

  /**
   * @public
   * 
   * @returns {Sitemap}
   */
  public get(): Sitemap {
    return this.sitemap;
  }
}

export type SitemapPage = {
  name: string,
  hasChildren: boolean,
  url?: string,
  children?: Sitemap
}

export type Sitemap = {
  [name: string]: SitemapPage
}