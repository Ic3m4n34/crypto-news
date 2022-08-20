import { getAllTags, getAllNews } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import getOrSetCache from '@/lib/cache';
import { Tag } from '@/types/tags';
import slugify from '@/helpers/slugify';
import { NewsEntry } from '@/types/news';

export default defineEventHandler(async () => {
  const topTags = await getOrSetCache('news:top-tags', async () => {
    const tags = await getAllTags(knexClient);
    return tags.map((tag: Tag) => ({
      ...tag,
      slug: slugify(tag.slug),
    }));
  });

  const staticRoutes = [
    '/',
    '/news',
  ];

  const toTagsRoutes = topTags.map((tag: Tag) => `/news/tag/${tag.slug}`);
  const allNews = await getAllNews(knexClient);

  const mappedAllNews = allNews.map((news: NewsEntry) => `/news/${slugify(news.title)}/${news.id}`);

  return [...toTagsRoutes, ...staticRoutes, ...mappedAllNews];
});
