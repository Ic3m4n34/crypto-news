import getOrSetCache from '@/lib/cache';
import getOrSetAllNews from '@/helpers/all-news';

export default defineEventHandler(async () => {
  const newestArticle = await getOrSetCache('newest-article', async () => {
    const allNews = await getOrSetAllNews();
    return allNews.slice(0, 1)[0];
  });

  return newestArticle;
});
