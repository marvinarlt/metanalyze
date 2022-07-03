import crawlUrlHandler from '@app/handlers/crawlUrl';
import checkUrlHandler from '@app/handlers/checkUrl';
import checkSnippetHandler from '@app/handlers/checkSnippet';

export default {
  'crawl-url': crawlUrlHandler,
  'check-url': checkUrlHandler,
  'check-snippet': checkSnippetHandler
}