import { Socket } from 'socket.io';
import puppeteer from 'puppeteer';
import puppeteerConfig from '@app/configs/puppeteer';
import emits from '@app/configs/emits';
import Validate from '@app/services/Validate';
import Crawler from '@app/services/Crawler';
import Extractor from '@app/services/Extractor';

/**
 * Handle the crawl-url event.
 *
 * @param {Socket} socket
 * @param {string} url
 * @returns {Promise<void>}
 */
export default async function urlCrawlHandler(socket: Socket, url: string): Promise<void> {
  if (! Validate.url(url)) {
    socket.emit(emits.INVALID_URL, url);
    return;
  }

  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();

  const extractor = new Extractor(page);
  const crawler = new Crawler(url, extractor);

  crawler.run();

  crawler.on('update', (data: any) => {
    socket.emit(emits.PAGE_META, data);
  });

  crawler.on('complete', () => {
    browser.close();
  });
}
