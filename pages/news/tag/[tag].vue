<template>
  <div class="relative bg-gray-50 pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8 tag-overview-page">
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
          {{ capitalizedTag }} News
        </h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Here are the latest <span class="font-bold">{{ capitalizedTag }}</span> news.
        </p>
      </div>
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none px-4">
        <NewsDisplayTile
          v-for="article in articles"
          :key="article.title"
          :article="article"
          :tag="tag"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from '@/lib/helpers';
import { computed } from 'vue';
import { NewsEntry } from '@/types/news';

const route = useRoute();
const { tag } = route.params;
let unsluggedTag;

if (typeof tag !== 'string') {
  throw new TypeError('Tag must be a string');
} else {
  unsluggedTag = tag.replace(/-/g, ' ');
}

const { data: articles } = await useAsyncData(`${tag}-details`, () => $fetch<NewsEntry>(`/api/tags/${unsluggedTag}?limit=100`));

const capitalizedTag = computed(() => capitalizeFirstLetter(tag));

useHead({
  title: `${capitalizedTag.value} | Encrypteer.com`,
  charset: 'utf-8',
  lang: 'en',
  meta: [
    { name: 'description', content: `We've curated ${capitalizedTag.value} News from every Crypto News Source. Read all the latest Ethereum News!` },
    { hid: 'og:title', property: 'og:title', content: `${capitalizedTag.value} | Encrypteer.com` },
    { hid: 'og:site_name', property: 'og:site_name', content: `${capitalizedTag.value} | Encrypteer.com` },
    { hid: 'og:description', property: 'og:description', content: `We've curated ${capitalizedTag.value} News from every Crypto News Source. Read all the latest Ethereum News!` },
    { hid: 'og:image', property: 'og:image', content: 'https://encrypteer.com/icon.png' },
    { hid: 'og:url', property: 'og:url', content: `https://encrypteer.com/news/tag/${tag}` },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://encrypteer.com/news/tag/${tag}`,
    },
  ],
});

</script>
