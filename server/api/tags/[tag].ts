import { getAllNews } from '../../../lib/knex-lib';
import knexClient from '../../../lib/knex-client';
import { cookNews } from '../../../lib/news';

export default defineEventHandler(async (event) => {
  const { tag } = event.context.params;
  let allNews = null;
  let cachedNews = null;

  let filteredByTag = await useStorage().getItem(`news:tag::${tag}`);
  if (filteredByTag) return filteredByTag;

  const cache = await useStorage().getItem('news:all');
  if (cache) {
    cachedNews = cookNews(cache);
  }

  if (cache) {
    allNews = cachedNews;
  } else {
    const fetchedNews = await getAllNews(knexClient);
    allNews = cookNews(fetchedNews);
  }

  const cookedNews = allNews.map((news) => {
    if (news.tags.length > 0) {
      return {
        ...news,
        tags: news.tags.map((newsTag) => newsTag.toLowerCase()),
      };
    }
    return news;
  });

  filteredByTag = cookedNews.filter((news) => news.tags.length > 0 && news.tags.includes(tag));
  await useStorage().setItem(`news:tag::${tag}`, cookNews(filteredByTag));
  return filteredByTag;
});
