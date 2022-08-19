import { getAllNewsCount, getAllNewsWithPagination } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import { cookNews } from '@/lib/news';
import getOrSetCache from '@/lib/cache';

export default defineEventHandler(async (event) => {
  const { limit, offset } = useQuery(event);

  const articleLimit = +limit;
  const articleOffset = +offset;

  const allNewsCount = await getOrSetCache('news:all', () => getAllNewsCount(knexClient));

  const dataInCache = await useStorage().getItem(`news:all:limit:${limit}:offset:${offset}`);

  if (dataInCache) return dataInCache;

  const allNewsWithPagination = await getAllNewsWithPagination(knexClient, articleLimit, articleOffset);
  useStorage().setItem(`news:all:limit:${limit}:offset:${offset}`, cookNews(allNewsWithPagination));

  return {
    news: cookNews(allNewsWithPagination),
    allNewsCount,
  };
});
