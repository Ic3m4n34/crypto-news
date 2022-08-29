import getOrSetCache from '@/lib/cache';
import getOrSetAllNews from '@/helpers/all-news';

export default defineEventHandler(async () => {
  const allNews = await getOrSetAllNews();
  const newestArticle = await getOrSetCache('newest-article', () => allNews.slice(0, 1)[0]);

  return newestArticle;
});
