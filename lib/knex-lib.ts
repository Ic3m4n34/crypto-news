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

const getNewsById = async (knexClient: Knex, id: string): Promise<NewsEntry> => {
  try {
    const news = await knexClient.select('*').from('news').where('id', id);
    return news[0];
  } catch (error) {
    console.error('Error in getNewsById: ', error);
    return null;
  }
};

export {
  getAllNews,
  getNewsById,
};
