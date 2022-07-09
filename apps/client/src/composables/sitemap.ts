import { sitemapStore } from '@app/stores/sitemap';
import { analyzeStore } from '@app/stores/analyze';
import Sitemap from '@app/services/sitemap';

export default function useSitemap() {

  /**
   * Get sitemap from store or regenerate.
   * 
   * @returns {any}
   */
  const getSitemap = () => {
    if (0 !== Object.keys(sitemapStore.state.sitemap).length) {
      return sitemapStore.state.sitemap;
    }

    const internalUrls = Array.from(analyzeStore.state.internal);
    const sitemapInstance = new Sitemap(internalUrls);
    const sitemap = sitemapInstance.generate();

    sitemapStore.set(sitemap);

    return sitemap;
  }

  return {
    sitemap: getSitemap()
  }
}