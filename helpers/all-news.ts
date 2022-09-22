import redisClient from '@/lib/redis';
import { NewsEntry } from '@/types/news';
import chunk from 'lodash.chunk';
import { getAllNews } from '@/lib/knex-lib';
import knexClient from '@/lib/knex-client';
// upstash limit: 1048576 bytes (1MB)
const UPSTASH_LIMIT_IN_BYTES = 900000;

type SizeInfo = {
  bytes: number;
  kilobytes: number;
}

const getByteSizeInKb = (news: NewsEntry[]): SizeInfo => ({
  bytes: new Blob([JSON.stringify(news)]).size,
  kilobytes: Math.ceil(new Blob([JSON.stringify(news)]).size / 1024),
});

const splitAllNews = async (news: NewsEntry[]): Promise<string> => {
  const newsSize = getByteSizeInKb(news);
  const chunkCount = Math.ceil(newsSize.bytes / UPSTASH_LIMIT_IN_BYTES);

  const chunkSize = Math.ceil(news.length / chunkCount);

  const newsChunks = chunk(news, chunkSize);

  try {
    await Promise.all(newsChunks.map((newsChunk: NewsEntry[], i: number) => redisClient.set(`news:all::chunk-${i + 1}`, JSON.stringify(newsChunk))));
  } catch (error) {
    console.error('Error setting news chunks', error);
  }
  return redisClient.set('news:all::number-of-chunks', newsChunks.length);
};

const retrieveNews = async (): Promise<NewsEntry[]> => {
  const numberOfChunks = await redisClient.get('news:all::number-of-chunks');
  const news: NewsEntry[] = [];

  const chunksToFetchArray = Array.from(Array(+numberOfChunks).keys()).map((i) => i + 1);

  for (let index = 0; index < chunksToFetchArray.length; index += 1) {
    const chunkNumber = chunksToFetchArray[index];
    const newsChunk = await redisClient.get(`news:all::chunk-${chunkNumber}`); // eslint-disable-line
    news.push(...JSON.parse(newsChunk));
  }

  return news;
};

const getOrSetAllNews = async (): Promise<NewsEntry[]> => {
  const numberOfChunks = await redisClient.get('news:all::number-of-chunks');

  if (numberOfChunks) {
    return retrieveNews();
  }
  const allNews = await getAllNews(knexClient);
  await splitAllNews(allNews);
  return retrieveNews();
};

export default getOrSetAllNews;
