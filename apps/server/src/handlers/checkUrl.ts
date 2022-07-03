import { Socket } from 'socket.io';
import puppeteer from 'puppeteer';
import puppeteerConfig from '@app/configs/puppeteer';
import emits from '@app/configs/emits';
import Validate from '@app/services/Validate';
import MetaExtractor from '@app/services/MetaExtractor';

/**
 * Handle the check-url event.
 * 
 * @param {Socket} socket
 * @param {string} url
 * @returns {Promise<void>}
 */
export default async function checkUrlHandler(socket: Socket, url: string): Promise<void> {
  if (! Validate.url(url)) {
    socket.emit(emits.INVALID_URL, url);
    return;
  }

  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();

  const extractor = new MetaExtractor(page);
  const pageMeta = await extractor.extractFromUrl(url);

  socket.emit(emits.PAGE_META, pageMeta);

  browser.close();
}