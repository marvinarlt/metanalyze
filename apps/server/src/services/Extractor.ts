import { HTTPResponse, Page } from 'puppeteer';
import Analyzer from '@app/analyzers/Analyzer';

export default class Extractor {

  /**
   * @private
   * 
   * @var {SelectorMap} selectors
   */
  private selectors: SelectorMap = {
    title: 'head > title',
    metas: 'head > meta',
    links: 'link',
    anchors: 'a',
    images: 'img',
    headlines: 'h1, h2, h3, h4, h5, h6'
  }

  /**
   * @private
   * 
   * @var {Page} page
   */
  private page: Page;

  /**
   * @private
   * 
   * @var {Analyzer} analyzer
   */
  private analyzer: Analyzer;

  /**
   * @constructor
   * 
   * @param {Page} page
   */
  public constructor(page: Page) {
    this.page = page;
    this.analyzer = new Analyzer();
  }

  /**
   * Extract meta data from URL.
   * 
   * @public
   * @async
   * 
   * @param {string} url
   * @returns {void}
   */
  public async extractFromUrl(url: string): Promise<UrlExtractedData> {
    const response = await this.goToPage(url);

    if (! response.ok) {
      return {
        requestedUrl: url,
        response
      }
    }

    return {
      requestedUrl: url,
      response,
      meta: await this.queryMetaData()
    }
  }

  /**
   * Extract meta data from HTML string.
   * 
   * @public
   * @async
   * 
   * @param {string} htmlString
   * @returns {void}
   */
  public async extractFromString(htmlString: string) {
    // TODO: Implement method
  }

  /**
   * Visit page using puppeteer.
   * 
   * @private
   * @async
   * 
   * @param {string} url
   * @returns {Promise<Response>}
   */
  private async goToPage(url: string): Promise<Response> {
    let response = null;

    try {
      response = await this.page.goto(url);
    } catch (error) {
      return this.getErrorResponse();
    }

    if (null === response) {
      return this.getErrorResponse();
    }

    return this.normalizeResponse(response);
  }

  /**
   * Get basic error response.
   * 
   * @private
   * 
   * @returns {Response}
   */
   private getErrorResponse(): Response {
    return {
      code: 500,
      ok: false
    }
  }

  /**
   * Normalize puppeteer http response.
   * 
   * @private
   * 
   * @param response
   * @returns {Response}
   */
  private normalizeResponse(response: HTTPResponse): Response {
    const status = response.status();

    return {
      code: status,
      ok: status === 200
    }
  }

  /**
   * Collect all page meta data.
   * 
   * @private
   * @async
   * 
   * @returns {Promise<MetaData>}
   */
  private async queryMetaData(): Promise<MetaData> {
    const metaData: MetaData = {};

    for (const [ propertyName, selector ] of Object.entries(this.selectors)) {
      const elementData = await this.collectDataBySelector(selector);
      
      metaData[propertyName] = this.analyzer.analyze(propertyName, elementData);
    }

    return metaData;
  }

  /**
   * Collect all meta data by selector.
   * 
   * @private
   * 
   * @param {string} selector
   * @returns {Promise<ElementData[]>}
   */
  private collectDataBySelector(selector: string): Promise<ElementData[]> {
    return this.page.$$eval(selector, (elements) => {

      /**
       * Collect all attributes from element.
       * 
       * @param {Element} element 
       * @returns {Attribute[]}
       */
      const getAttributesFromElement = (element: Element): Attribute[] => {
        const attributes: Attribute[] = [];
    
        for (const attribute of element.attributes) {
          attributes.push({
            name: attribute.name.toLowerCase(),
            value: attribute.value
          });
        }
    
        return attributes;
      }

      return elements.map((element) => {
        return {
          attributes: getAttributesFromElement(element),
          tagName: element.tagName.toLowerCase(),
          html: element.outerHTML.trim(),
          content: element.innerHTML.trim()
        }
      });
    });
  }
}

export type SelectorMap = {
  [name: string]: string
}

export type Response = {
  code: number,
  ok: boolean
}

export type Attribute = {
  name: string,
  value: string
}

export type ElementData = {
  attributes: Attribute[],
  html: string,
  content: string
}

export type MetaData = {
  [collection: string]: ElementData[]
}

export type UrlExtractedData = {
  requestedUrl: string,
  response: Response,
  meta?: MetaData
}