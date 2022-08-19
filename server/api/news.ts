import { getAllNewsWithPagination } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import { cookNews } from '@/lib/news';

export default defineEventHandler(async (event) => {
  const { limit, offset } = useQuery(event);

  const articleLimit = +limit;
  const articleOffset = +offset;

  const dataInCache = await useStorage().getItem(`news:all:limit:${limit}:offset:${offset}`);

  if (dataInCache) return dataInCache;

  const allNews = await getAllNewsWithPagination(knexClient, articleLimit, articleOffset);
  useStorage().setItem(`news:all:limit:${limit}:offset:${offset}`, cookNews(allNews));

  return cookNews(allNews);
});
