import { getAllNews } from '../../../lib/knex-lib';
import knexClient from '../../../lib/knex-client';

export default defineEventHandler(async (event) => {
  const { tag } = event.context.params;
  let allNews = null;

  let filteredByTag = await useStorage().getItem(`news:tag::${tag}`);
  if (filteredByTag) return filteredByTag;

  const cache = await useStorage().getItem('news:all');

  if (cache) {
    allNews = cache;
  } else {
    allNews = await getAllNews(knexClient);
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
  await useStorage().setItem(`news:tag::${tag}`, filteredByTag);
  return filteredByTag;
});
