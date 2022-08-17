import { getAllTags } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
import getOrSetCache from '@/lib/cache';

export default defineEventHandler(async () => getOrSetCache('news:top-tags}', () => getAllTags(knexClient)));
