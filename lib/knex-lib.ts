import { NewsEntry } from '@/types/news';
import { Knex } from 'knex';

const getAllNews = async (knexClient: Knex) => {
  try {
    const allNews = await knexClient.select('*').from('news').where('language', 'english').orderBy('publish_timestamp', 'desc');
    return allNews;
  } catch (error) {
    console.error('Error in getAllNews: ', error);
    return null;
  }
};

const getAllNewsWithPagination = async (knexClient: Knex, limit: number, offset: number) => {
  try {
    const allNews = await knexClient.select('*')
      .from('news')
      .where('language', 'english')
      .orderBy('publish_timestamp', 'desc')
      .limit(limit)
      .offset(offset);

    console.log('getAllNewsWithPagination:', allNews.length);

    return allNews;
  } catch (error) {
    console.error('Error in getAllNews: ', error);
    return [];
  }
};

const getNewsById = async (knexClient: Knex, id: string): Promise<NewsEntry> => {
  try {
    const news = await knexClient.select('*').from('news').where('id', id);
    return news[0];
  } catch (error) {
    console.error('Error in getNewsById: ', error);
    return null;
  }
};

const getAllNewsCount = async (knexClient: Knex) => {
  try {
    const allNewsCount = await knexClient('news').count('id');
    return allNewsCount[0].count;
  } catch (error) {
    console.error('Error in getAllNewsCount: ', error);
    return null;
  }
};

const getAllTags = async (knexClient: Knex) => {
  try {
    const mappedTags = [];
    const allTags = await knexClient.select('tags').from('news').where('language', 'english');
    allTags.forEach((tagObject) => {
      if (tagObject.tags.length > 0) {
        tagObject.tags.forEach((tag) => mappedTags.push(tag));
      }
    });

    // count occurrences of each tag
    const tagCounts = mappedTags.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const mostUsedTags = Object.keys(tagCounts).filter((tag) => tagCounts[tag] > 10);

    const topTags = mostUsedTags.map((tag) => ({
      name: tag,
      count: tagCounts[tag],
      slug: tag.toLowerCase(),
    }));

    return topTags;
  } catch (error) {
    console.error('Error in getAllTags: ', error);
    return null;
  }
};

export {
  getAllNews,
  getNewsById,
  getAllTags,
  getAllNewsWithPagination,
  getAllNewsCount,
};
