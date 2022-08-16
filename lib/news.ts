import { NewsEntry, CookedNews } from '@/types/news';

const cookNews = (news: NewsEntry[]): CookedNews[] => news.map((newsEntry) => {
  const readingTime = Math.ceil(newsEntry.html_content.split(' ').length / 200);
  return {
    ...newsEntry,
    readingTime,
  };
});

export { cookNews };
