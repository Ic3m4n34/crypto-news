<template>
  <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 tag-overview-page">
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
          {{ capitalizeFirstLetter(tag) }} News
        </h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Here are the latest <span class="font-bold">{{ capitalizeFirstLetter(tag) }}</span> news.
        </p>
      </div>
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <NewsDisplayTile
          v-for="article in articles"
          :key="article.title"
          :article="article"
          :tag="'bitcoin'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { capitalizeFirstLetter } from '@/lib/helpers';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TagOverviewPage',
  async setup() {
    const route = useRoute();
    const { tag } = route.params;
    const { data: articles } = await useFetch(`/api/tags/${tag}`);

    useHead({
      title: `${capitalizeFirstLetter(tag)} - All News`,
      charset: 'utf-8',
      lang: 'en',
      meta: [
        { name: 'description', content: `We've curated ${capitalizeFirstLetter(tag)} News from every Crypto News Source. Read all the latest Ethereum News!` },
      ],
    });

    return {
      articles,
      tag,
      capitalizeFirstLetter,
    };
  },
});
</script>
