import { Page } from 'puppeteer';
import MetaExtractor, { ElementData } from '@app/services/MetaExtractor';

export default class Crawler {

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
   * @var {Page} page
   */
  private page: Page;

  /**
   * @private
   * 
   * @var {MetaExtractor} extractor
   */
  private extractor: MetaExtractor;

  /**
   * @public
   * @constructor
   * 
   * @param {Page} page
   */
  public constructor(url: string, page: Page) {
    this.originUrl = new URL(url);
    this.page = page;
    this.extractor = new MetaExtractor(page);
  }

  /**
   * @public
   * @async
   * 
   * @returns {Promise<void>}
   */
  public async run(): Promise<void> {
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
    const { response, meta } = await this.extractor.extractFromUrl(url.toString());

    if (! response.ok) {
      this.invalidUrls.set(url.toString(), url);
    } else {
      this.crawledUrls.set(url.toString(), url);
      this.updateInternalUrls(meta?.anchors as ElementData[]);
    }

    console.log(this.urlMapToArray(this.urlsToCrawl));

    this.emit('update', {
      crawled: this.urlMapToArray(this.crawledUrls),
      internal: this.urlMapToArray(this.internalUrls),
      invalid: this.urlMapToArray(this.invalidUrls),
      queue: this.urlMapToArray(this.urlsToCrawl),
      response,
      meta,
    });

    this.urlsToCrawl.delete(url.toString());

    if (0 === this.urlsToCrawl.size) {
      this.emit('complete');
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
  private urlMapToArray(map: Map<string, URL>): string[] {
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

    // TODO: Check file extension

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