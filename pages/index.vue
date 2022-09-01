<template>
  <div class="index">
    <div v-if="!pending">
      <NewsHeader :newest-article="newestArticle" />
    </div>
    <div v-if="homepageNews">
      <NewsSection
        v-for="newsSection in homepageNews"
        :key="slugify(newsSection.tag.slug)"
        :headline="newsSection.tag.name"
        :articles="newsSection.news"
        :tag="newsSection.tag.slug"
      >
        <template #headline>
          {{ newsSection.tag.name }} News
        </template>

        <template #description>
          Here are the latest <span class="font-bold">{{ newsSection.tag.name }}</span> news.
        </template>

        <template #call-to-action>
          <NuxtLink :to="`/news/tag/${slugify(newsSection.tag.slug)}`" class="text-indigo-600 text-xl">
            For more <span class="font-bold">{{ newsSection.tag.name }}</span> News, click here!
          </NuxtLink>
        </template>
      </NewsSection>
    </div>
    <NewsSectionSekelton v-else />
  </div>
</template>

<script>
import { ref } from 'vue';
import slugify from '@/helpers/slugify';

export default {
  name: 'IndexPage',
  setup() {
    const homepageNews = ref(null);

    useHead({
      title: 'Encrypteer.com - Latest Crypto News',
      charset: 'utf-8',
      lang: 'en',
      meta: [
        { name: 'description', content: 'Find all the latest crypto news, sorted by date, here. Read more!' },
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://encrypteer.com',
        },
      ],
    });

    const { data: newestArticle, pending } = useLazyAsyncData('newest-article-homepage', () => $fetch('/api/newest-article'));

    onMounted(async () => {
      const newsData = await $fetch('/api/homepage');
      homepageNews.value = newsData.news;
    });

    return {
      homepageNews,
      newestArticle,
      pending,
      slugify,
    };
  },
};
</script>
