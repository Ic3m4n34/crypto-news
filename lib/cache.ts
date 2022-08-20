import redisClient from '@/lib/redis';

const getOrSetCache = async (key: string, cb, ttlInSeconds?: number) => {
  const ttl = ttlInSeconds || 60 * 60 * 24;
  const cachedData = await redisClient.get(key);

  if (cachedData) return JSON.parse(cachedData);

  const data = await cb();
  try {
    redisClient.set(key, JSON.stringify(data), 'EX', ttl);
    return data;
  } catch (error) {
    console.error(`Error setting cache for key ${key}`, error);
  }
};

export default getOrSetCache;
