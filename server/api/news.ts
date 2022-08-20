import { getAllNewsCount, getAllNewsWithPagination } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import { cookNews } from '@/lib/news';
import getOrSetCache from '@/lib/cache';

export default defineEventHandler(async (event) => {
  const { limit, offset } = useQuery(event);

  const articleLimit = +limit;
  const articleOffset = +offset;

  const allNewsCount = await getOrSetCache('news:all-news-count', async () => getAllNewsCount(knexClient), 60 * 60 * 24);

  const dataInCache = await getOrSetCache(`news:all:limit:${limit}:offset:${offset}`, async () => {
    const allNewsWithPagination = await getAllNewsWithPagination(knexClient, articleLimit, articleOffset);
    return cookNews(allNewsWithPagination);
  }, 60 * 60 * 24);

  return {
    news: dataInCache,
    allNewsCount,
  };
});
