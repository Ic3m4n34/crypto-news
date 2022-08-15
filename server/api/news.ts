import { getAllNews } from '../../lib/knex-lib';
import knexClient from '../../lib/knex-client';

export default defineEventHandler(async (event) => {
  const dataInCache = await useStorage().getItem('news:all');

  if (dataInCache) return dataInCache;

  const allNews = await getAllNews(knexClient);
  useStorage().setItem('news:all', allNews);

  return allNews;
});
