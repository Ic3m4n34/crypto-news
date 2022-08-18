<template>
  <div class="index">
    <NewsHeader />
    <NewsSection
      v-for="newsSection in homepageNews"
      :key="slugify(newsSection.tag.tag)"
      :headline="newsSection.tag.name"
      :articles="newsSection.news"
      :tag="newsSection.tag"
    >
      <template #headline>
        {{ newsSection.tag.name }} News
      </template>

      <template #description>
        Here are the latest <span class="font-bold">{{ newsSection.tag.name }}</span> news.
      </template>
    </NewsSection>
  </div>
</template>

<script>
import slugify from 'slugify';

export default {
  name: 'IndexPage',
  async setup() {
    const { data: homepageNews } = await useFetch('/api/homepage');

    return {
      homepageNews,
      slugify,
    };
  },
};
</script>
