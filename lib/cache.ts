import redisClient from '@/lib/redis';

const getOrSetCache = async (key: string, cb, ttlInSeconds?: number) => {
  const keyWithDateTime = `${key}_${new Date().toISOString()}`;
  const ttl = ttlInSeconds || 60 * 60 * 24;
  const cachedData = await redisClient.get(keyWithDateTime);

  if (cachedData) return JSON.parse(cachedData);

  const data = await cb();
  try {
    redisClient.set(keyWithDateTime, JSON.stringify(data), 'EX', ttl);
    return data;
  } catch (error) {
    console.error(`Error setting cache for key ${keyWithDateTime}`, error);
    return null;
  }
};

export default getOrSetCache;
