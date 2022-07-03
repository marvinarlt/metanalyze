import { Socket } from 'socket.io';

/**
 * Handle the crawl-url event.
 * 
 * @param {Socket} socket
 * @param {string} url
 * @returns {void}
 */
export default function crawlUrlHandler(socket: Socket, url: string): void {
  console.log('Crawl:', url);
}