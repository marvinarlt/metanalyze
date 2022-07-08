import { reactive } from 'vue';

export const metaDataStore = reactive({
  /**
   * @var {Map} state
   */
  state: new Map(),

  /**
   * Add an entry.
   * 
   * @param {string} url
   * @param {MetaData} metaData
   * @returns {void}
   */
  set(url: string, metaData: MetaData) {
    this.state.set(url, metaData);
  },

  /**
   * Get an entry.
   * 
   * @param {string} url
   * @returns {MataData}
   */
  get(url: string): MetaData {
    return this.state.get(url);
  },

  /**
   * Delete an entry.
   * 
   * @param {string} url
   * @returns {void}
   */
  delete(url: string): void {
    this.state.delete(url);
  },

  /**
   * Check if an entry exists.
   * 
   * @param {string} url
   * @returns {boolean}
   */
  has(url: string): boolean {
    return this.state.has(url);
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