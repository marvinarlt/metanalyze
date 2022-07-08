import { reactive } from 'vue';

export const analyzeStore = reactive({
  /**
   * @var {Map} state
   */
  state: {
    initialUrl: '',
    initialShouldCrawl: false,
    initialSnippet: '',
    lastCrawledPage: '',
    crawledPages: 0,
    foundPages: 0,
    meta: new Map()
  },

  /**
   * Set the initial url.
   * 
   * @param {string} url
   * @returns {void}
   */
  setInitialUrl(url: string): void {
    this.state.initialUrl = url;
    this.state.foundPages = 1;
  },

  /**
   * Set the initial should crawl state.
   * 
   * @param {boolean} shouldCrawl
   * @returns {void}
   */
  setInitialShouldCrawl(shouldCrawl: boolean): void {
    this.state.initialShouldCrawl = shouldCrawl;
  },

  /**
   * Set the initial snippet.
   * 
   * @param {string} snippet
   * @returns {void}
   */
  setInitialSnippet(snippet: string): void {
    this.state.initialSnippet = snippet;
    this.state.foundPages = 1;
  },

  /**
   * Add an entry.
   * 
   * @param {string} url
   * @param {MetaData} metaData
   * @returns {void}
   */
  set(url: string, metaData: MetaData): void {
    this.state.meta.set(url, metaData);
    this.state.lastCrawledPage = url;
    this.state.crawledPages = this.state.meta.size;
  },

  /**
   * Get an entry.
   * 
   * @param {string} url
   * @returns {MataData}
   */
  get(url: string): MetaData {
    return this.state.meta.get(url);
  },

  /**
   * Delete an entry.
   * 
   * @param {string} url
   * @returns {void}
   */
  delete(url: string): void {
    this.state.meta.delete(url);
  },

  /**
   * Check if an entry exists.
   * 
   * @param {string} url
   * @returns {boolean}
   */
  has(url: string): boolean {
    return this.state.meta.has(url);
  }
});

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

export type Response = {
  code: number,
  ok: boolean
}

export type UrlExtractedData = {
  requestedUrl: string,
  response: Response,
  meta?: MetaData
}