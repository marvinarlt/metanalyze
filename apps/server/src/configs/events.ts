import urlCrawlHandler from '@app/handlers/urlCrawl';
import urlCheckHandler from '@app/handlers/urlCheck';
import snippetCheckHandler from '@app/handlers/snippetCheck';

export default {
  'url-crawl': urlCrawlHandler,
  'url-check': urlCheckHandler,
  'snippet-check': snippetCheckHandler
}