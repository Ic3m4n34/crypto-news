const getAllNews = async (knexClient) => {
  try {
    const allNews = await knexClient.select('*').from('news');
    return allNews;
  } catch (error) {
    console.error('Error in getAllNews: ', error);
    return null;
  }
};

export {
  getAllNews,
};
