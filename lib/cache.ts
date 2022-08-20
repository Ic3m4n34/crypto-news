import 'dotenv/config';
import Redis from 'ioredis';

const redisClient = new Redis(process.env.REDIS_URL);

const getOrSetCache = async (key: string, cb, ttlInSeconds?: number) => {
  const ttl = ttlInSeconds || 60 * 60 * 24;
  const cachedData = await redisClient.get(key);

  if (cachedData) return JSON.parse(cachedData);

  const data = await cb();
  redisClient.set(key, JSON.stringify(data), 'EX', ttl);
  return data;
};

export default getOrSetCache;
