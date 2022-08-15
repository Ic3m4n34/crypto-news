import { getAllNews } from '../../lib/knex-lib';
import knexClient from '../../lib/knex-client';

const getCache = async (key) => useStorage().getItem(key);

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const { tag } = query;

  if (tag) {
    const allNews = await getCache('news:all');

    console.log('###################################');
    console.log('###################################');
    console.log(allNews);
    console.log('###################################');
    console.log('###################################');

    const cookedNews = allNews.map((news) => {
      if (news.tags.length > 0) {
        return news.tags.map((newsTag) => newsTag.toLowerCase());
      }
      return [];
    });

    return cookedNews.filter((news) => news.tags.toLowerCase().includes(tag));
  }

  const dataInCache = await getCache('news:all');

  if (dataInCache) return dataInCache;

  const allNews = await getAllNews(knexClient);
  useStorage().setItem('news:all', allNews);

  return allNews;
});
