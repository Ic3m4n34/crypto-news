import { getAllNews } from '../../lib/knex-lib';
import knexClient from '../../lib/knex-client';

// eslint-disable-next-line no-undef
export default defineEventHandler(async (event) => {
  console.log('###################################');
  console.log('###################################');
  console.log(event);
  console.log('###################################');
  console.log('###################################');
  const allNews = await getAllNews(knexClient);

  return allNews;
});
