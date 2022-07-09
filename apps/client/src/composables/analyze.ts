import { useRouter } from 'vue-router';
import { useSocket } from '@app/composables/socket';
import { analyzeStore } from '@app/stores/analyze';

export function useAnalyze() {
  const router = useRouter();
  const { connection, emits, events } = useSocket();

  /**
   * Start analyzing by url.
   * 
   * @param {string} url
   * @param {boolean} shouldCrawl
   * @returns {void}
   */
  const url = (url: string, shouldCrawl: boolean) => {
    const emitEvent = shouldCrawl
      ? emits.URL_CRAWL
      : emits.URL_CHECK;

    connection.emit(emitEvent, url);
    analyzeStore.setInitialUrl(url);
    analyzeStore.setInitialShouldCrawl(shouldCrawl);

    connection.on(events.PAGE_META, ({ requestedUrl, response, meta, queue, crawled, internal, invalid }) => {
      analyzeStore.setQueue(queue);
      analyzeStore.setCrawled(crawled);
      analyzeStore.setInternal(internal);
      analyzeStore.setInvalid(invalid);

      if (response.ok) {
        analyzeStore.set(requestedUrl, meta);
      }

      if (0 === queue.length) {
        router.push({ name: 'dashboard-index' });
      }
    });
    
    router.push({ name: 'analyze' });
  }

  /**
   * Start analyzing by html snippet.
   * 
   * @param {string} html
   * @returns {void}
   */
  const snippet = (html: string) => {
    // TODO: Implement
  }

  return {
    url,
    snippet
  }
}