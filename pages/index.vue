<template>
  <div class="index">
    <div v-if="!pending">
      <NewsHeader :newest-article="homepageNews.newestArticle" />
    </div>
    <div v-if="!pending">
      <NewsSection
        v-for="newsSection in homepageNews.news"
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
  </div>
</template>

<script>
import slugify from '@/helpers/slugify';

export default {
  name: 'IndexPage',
  async setup() {
    const { data: homepageNews, pending } = await useFetch('/api/homepage');

    return {
      homepageNews,
      pending,
      slugify,
    };
  },
};
</script>
