import { reactive } from 'vue';

export const sitemapStore = reactive({
  state: {
    sitemap: {}
  },

  /**
   * Set a new generated sitemap.
   * 
   * @param {any} sitemap
   * @returns {void}
   */
  set(sitemap: any): void {
    this.state.sitemap = sitemap;
  }
});