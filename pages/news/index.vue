<template>
  <div class="all-news">
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
          All Crypto News
        </h1>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Find all the latest crypto news here!
        </p>
      </div>
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <NewsDisplayTile
          v-for="article in articles"
          :key="article.title"
          :article="article"
        />
      </div>
    </div>
    <NewsSection :articles="articles" />
  </div>
</template>

<script setup lang="ts">
import { NewsEntry } from '@/types/news';

const { data: articles } = useAsyncData('all-news', () => $fetch<NewsEntry[]>('/api/news'));

useHead({
  title: 'Latest Crypto News | Encrypteer.com',
  charset: 'utf-8',
  lang: 'en',
  meta: [
    { name: 'description', content: 'Find all the latest crypto news, sorted by date, here. Read more!' },
  ],
});
</script>
