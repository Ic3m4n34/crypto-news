<template>
  <div class="index">
    <NewsHeader />
    <NewsSection
      v-for="newsSection in homepageNews"
      :key="slugify(newsSection.tag.tag)"
      :headline="newsSection.tag.name"
      :articles="newsSection.news"
      :tag="newsSection.tag"
    />
  </div>
</template>

<script>
import slugify from 'slugify';

export default {
  name: 'IndexPage',
  async setup() {
    const { data: homepageNews } = await useFetch('/api/homepage');

    useHead({
      charset: 'utf-8',
      lang: 'en',
      meta: [
        { name: 'description', content: 'We\'ve curated all News from every Crypto News Source. Read all the latest Crypto News now!' },
      ],
    });

    return {
      homepageNews,
      slugify,
    };
  },
};
</script>
