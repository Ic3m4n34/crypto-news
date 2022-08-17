<template>
  <div class="index">
    <NewsHeader />
    <NewsSection
      v-for="tag in tags"
      :key="slugify(tag.tag)"
      :headline="tag.name"
      :tag="tag.tag"
    />
  </div>
</template>

<script>
import slugify from 'slugify';

export default {
  name: 'IndexPage',
  async setup() {
    const { data: tags } = await useFetch('/api/top-tags');

    useHead({
      charset: 'utf-8',
      lang: 'en',
      meta: [
        { name: 'description', content: 'We\'ve curated all News from every Crypto News Source. Read all the latest Crypto News now!' },
      ],
    });

    return {
      tags,
      slugify,
    };
  },
};
</script>
