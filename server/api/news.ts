import { getAllNews } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import { cookNews } from '@/lib/news';

export default defineEventHandler(async () => {
  const dataInCache = await useStorage().getItem('news:all');

  if (dataInCache) return dataInCache;

  const allNews = await getAllNews(knexClient);
  useStorage().setItem('news:all', cookNews(allNews));

  return cookNews(allNews);
});
