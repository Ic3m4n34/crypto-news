import { NewsEntry, CookedNews } from '@/types/news';

const cookNews = (news: NewsEntry[]): CookedNews[] => news.map((newsEntry) => {
  // TODO: do in backend
  // const readingTime = Math.ceil(newsEntry.html_content.split(' ').length / 200);
  const readingTime = null;
  return {
    ...newsEntry,
    readingTime,
  };
});

export { cookNews };
