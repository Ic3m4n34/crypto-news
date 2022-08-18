import { getAllNews } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import { cookNews } from '@/lib/news';
import { NewsEntry } from '@/types/news';
import getOrSetCache from '@/lib/cache';

export default defineEventHandler(async (event) => {
  const { tag } = event.context.params;
  const { limit } = useQuery(event);

  const articleLimit = +limit || 'no-limit';

  const allNews = await getOrSetCache('news:all', () => getAllNews(knexClient));

  let filteredByTag = await getOrSetCache(`news:tag::${tag}::limit:${articleLimit}`, () => useStorage().setItem(`news:tag::${tag}`));
  if (filteredByTag) return filteredByTag;

  const cookedNews = cookNews(allNews); // adds readingTime property to each news entry

  const mappedNews = cookedNews.map((news: NewsEntry) => { // tags to lowercase
    if (news.tags.length > 0) {
      return {
        ...news,
        tags: news.tags.map((newsTag: string) => newsTag.toLowerCase()),
      };
    }
    return news;
  });

  filteredByTag = mappedNews.filter((news) => news.tags.length > 0 && news.tags.includes(tag));

  if (articleLimit === 'no-limit') {
    await useStorage().setItem(`news:tag::${tag}::limit:${articleLimit}`, cookNews(filteredByTag));
    return filteredByTag;
  }

  await useStorage().setItem(`news:tag::${tag}::limit:${articleLimit}`, cookNews(filteredByTag.slice(0, articleLimit)));
  return filteredByTag;
});
