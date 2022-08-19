const axios = require('axios');
require('dotenv').config();

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

const getRoutes = async () => {
  const { data: topTags } = await axios.get(`${baseURL}/api/top-tags`);

  console.log(topTags);

  // all news - create page first!

  // all single page news
};

getRoutes();

module.exports = getRoutes;
