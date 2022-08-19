const getOrSetCache = async (key: string, cb) => {
  const cachedData = await useStorage().getItem(key);

  if (cachedData) return cachedData;

  const data = await cb();

  await useStorage().setItem(key, data);
  return data;
};

export default getOrSetCache;
