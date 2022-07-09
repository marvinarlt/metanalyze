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
    crawled: new Set() as Set<string>,
    queue: new Set() as Set<string>,
    internal: new Set() as Set<string>,
    invalid: new Set() as Set<string>,
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
    this.state.internal.add(url);
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
  },

  /**
   * Add unique to set.
   * 
   * @param {Set<string>} base
   * @param {string[]} toAdd
   * @returns {Set<string>}
   */
  addUnique(base: Set<string>, toAdd: string[]): Set<string> {
    toAdd.forEach(((add: string) => {
      if (! base.has(add)) {
        base.add(add);
      }
    }).bind(this));

    return base;
  },

  /**
   * Set all crawled urls.
   * 
   * @param {string[]} crawled
   * @returns {void}
   */
  setCrawled(crawled: string[]): void {
    this.addUnique(this.state.crawled, crawled);
  },

  /**
   * Set urls that needs to be crawled.
   * 
   * @param {string[]} queue
   * @returns {void} 
   */
  setQueue(queue: string[]): void {
    this.addUnique(this.state.queue, queue);
  },

  /**
   * Set found internal urls.
   * 
   * @param {string[]} internal
   * @returns {void}
   */
  setInternal(internal: string[]): void {
    this.addUnique(this.state.internal, internal);
  },

  /**
   * Set invalid urls.
   * 
   * @param {string[]} invalid
   * @returns {void}
   */
  setInvalid(invalid: string[]): void {
    this.addUnique(this.state.invalid, invalid);
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