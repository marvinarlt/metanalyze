import path from 'path';
import Extractor, { ElementData } from '@app/services/Extractor';
import SitemapBuilder from '@app/services/SitemapBuilder';

export default class Crawler {

  /**
   * @private
   * @readonly
   * 
   * @var {string[]} allowedExtensions
   */
  private readonly allowedExtensions: string[] = [
    'html', 'htm', 'php'
  ];

  /**
   * @private
   * @readonly
   * 
   * @var {number} maxCrawlPages
   */
  private readonly maxCrawlPages: number = 200;

  /**
   * @private
   * 
   * @var {Map<string, URL>} urlsToCrawl
   */
   private urlsToCrawl: Map<string, URL> = new Map();

  /**
   * @private
   * 
   * @var {Map<string, URL>} internalUrls
   */
  private internalUrls: Map<string, URL> = new Map();

  /**
   * @private
   * 
   * @var {Map<string, URL>} crawledUrls
   */
  private crawledUrls: Map<string, URL> = new Map();

  /**
   * @private
   * 
   * @var {Map<string, URL>} invalidUrls
   */
  private invalidUrls: Map<string, URL> = new Map();

  /**
   * @private
   * 
   * @var {Map<string, Function>} events
   */
  private events: Map<string, Function> = new Map();

  /**
   * @private
   * 
   * @var {URL | null} originUrl
   */
  private originUrl: URL;

  /**
   * @private
   * 
   * @var {Extractor} extractor
   */
  private extractor: Extractor;

  /**
   * @private
   * 
   * @var {SitemapBuilder} sitemapBuilder
   */
  private sitemapBuilder: SitemapBuilder;

  /**
   * @public
   * @constructor
   * 
   * @param {Page} page
   * @param {Extractor} extractor
   */
  public constructor(url: string, extractor: Extractor) {
    this.originUrl = new URL(url);
    this.extractor = extractor;
    this.sitemapBuilder = new SitemapBuilder();
  }

  /**
   * @public
   * @async
   * 
   * @returns {Promise<void>}
   */
  public async run(): Promise<void> {
    // TODO: Get, parse and check robots.txt
    // TODO: Extract urlsToCrawl from sitemap.xml
    
    this.crawlUrl(this.originUrl);
  }

  /**
   * @private
   * @async
   * 
   * @param {URL} url
   * @returns {Promise<void>}
   */
  private async crawlUrl(url: URL): Promise<void> {
    const { requestedUrl, response, meta } = await this.extractor.extractFromUrl(url.toString());

    if (! response.ok) {
      this.invalidUrls.set(url.toString(), url);
    } else {
      this.crawledUrls.set(url.toString(), url);
      this.sitemapBuilder.add(url);
      this.updateInternalUrls(meta?.anchors as ElementData[]);
    }

    this.urlsToCrawl.delete(url.toString());

    this.emit('update', {
      crawled: this.mapKeysToArray(this.crawledUrls),
      internal: this.mapKeysToArray(this.internalUrls),
      invalid: this.mapKeysToArray(this.invalidUrls),
      queue: this.mapKeysToArray(this.urlsToCrawl),
      requestedUrl,
      response,
      meta,
    });

    if (0 === this.urlsToCrawl.size || this.maxCrawlPages === this.crawledUrls.size) {
      this.emit('complete', {
        crawled: this.mapKeysToArray(this.crawledUrls),
        internal: this.mapKeysToArray(this.internalUrls),
        invalid: this.mapKeysToArray(this.invalidUrls),
        queue: this.mapKeysToArray(this.urlsToCrawl),
        sitemap: this.sitemapBuilder.get()
      });
      return;
    }

    this.crawlNextUrl();
  }

  /**
   * @private
   * 
   * @returns {void}
   */
  private crawlNextUrl() {
    const [ nextUrlToCrawlKey ] = this.urlsToCrawl.keys();
    const nextUrlToCrawl = this.urlsToCrawl.get(nextUrlToCrawlKey);

    this.crawlUrl(nextUrlToCrawl as URL);
  }

  /**
   * @private
   * 
   * @param {Map<string, URL>} map
   * @returns {string[]}
   */
  private mapKeysToArray(map: Map<string, URL>): string[] {
    return Array.from(map.keys());
  }

  /**
   * @private
   * 
   * @param {ElementData[]} anchors
   * @returns {void}
   */
  private updateInternalUrls(anchors: ElementData[]): void {
    for (let anchor of anchors) {
      const hrefAttribute = anchor.attributes.find(attribute => 'href' === attribute.name);

      if (! hrefAttribute) {
        continue;
      }

      try {
        const hrefUrl = this.normalizeUrl(hrefAttribute.value);

        if (! this.isUniqueInternalUrl(hrefUrl)) {
          continue;
        }

        this.internalUrls.set(hrefUrl.toString(), hrefUrl);

        if (! this.crawledUrls.has(hrefUrl.toString())) {
          this.urlsToCrawl.set(hrefUrl.toString(), hrefUrl);
        }
      } catch (error) {
        continue;
      }
    }
  }

  /**
   * @private
   * 
   * @param {URL} url
   * @returns {boolean}
   */
  private isUniqueInternalUrl(url: URL): boolean {
    if (url.origin !== this.originUrl.origin) {
      return false;
    }

    if (this.internalUrls.has(url.toString())) {
      return false;
    }

    const extension = path.extname(url.pathname).slice(1).toLowerCase();

    if ('' !== extension && ! this.allowedExtensions.includes(extension)) {
      return false;
    }

    return true;
  }

  /**
   * @private
   * 
   * @param {string} url
   * @returns {URL}
   */
  private normalizeUrl(url: string): URL {
    const urlInstance = new URL(url, this.originUrl.origin);
    const normalizedUrl = urlInstance.origin + urlInstance.pathname;

    return new URL(normalizedUrl);
  }

  /**
   * @public
   * 
   * @param {string} event
   * @param {Function} callback
   * @returns {void}
   */
  public on(event: string, callback: Function): void {
    this.events.set(event, callback);
  }

  /**
   * @private
   * 
   * @param {string} event
   * @param {...any} parameters
   * @returns {void}
   */
  private emit(event: string, ...parameters: any): void {
    if (! this.events.has(event)) {
      return;
    }

    const callback = this.events.get(event);

    if (callback instanceof Function) {
      callback(...parameters);
    }
  }
}