import { getNewsById } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import getOrSetCache from '@/lib/cache';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  return getOrSetCache(`news:id::${id}`, () => getNewsById(knexClient, id));
});
