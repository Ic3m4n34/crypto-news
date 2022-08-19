import { getAllTags } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import getOrSetCache from '@/lib/cache';
import slugify from '@/helpers/slugify';
import { Tag } from '@/types/tags';

export default defineEventHandler(async () => getOrSetCache('news:top-tags}', async () => {
  const tags = await getAllTags(knexClient);
  return tags.map((tag: Tag) => ({
    ...tag,
    slug: slugify(tag.slug),
  }));
}));
