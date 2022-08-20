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
      <div
        v-if="!pending"
        class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none px-4"
      >
        <NewsDisplayTile
          v-for="article in allNews.news"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
    <div class="flex justify-center py-20 max-w-7xl mx-auto">
      <nav class="relative z-0 flex flex-row flex-wrap rounded-md shadow-sm w-full" aria-label="Pagination">
        <NuxtLink :to="`/news?page=${page - 1}`" class="relative block items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </NuxtLink>
        <NuxtLink
          v-for="paginationPage in paginationPages"
          :key="`page-${paginationPage}`"
          :to="{path: '/news', query : {page: paginationPage} }"
          :class="getActiveClass(paginationPage)"
        >
          {{ paginationPage }}
        </NuxtLink>
        <NuxtLink :to="`/news?page=${page + 1}`" class="relative block items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import { computed, watch } from 'vue';
import { AllNewsType } from '@/types/news';

const route = useRoute();
const { query } = route;
const { page } = query;

const pageReactive = computed(() => route.query.page);
const offset = computed(() => (pageReactive.value ? (+pageReactive.value - 1) * 100 : 0));

const { data: allNews, refresh, pending } = await useAsyncData('all-news', () => $fetch<AllNewsType>(`/api/news?limit=100&offset=${offset.value}`));

watch(pageReactive, () => refresh());

const articleCount = computed(() => {
  if (!allNews.value) {
    return 0;
  }
  return allNews.value.allNewsCount;
});

const paginationPages = computed(() => {
  if (!articleCount.value) {
    return [];
  }
  const pages = Math.ceil(articleCount.value / 100);

  return Array.from(Array(pages).keys()).map((i) => i + 1);
});

const getActiveClass = (activePage: number) => {
  if (activePage === +pageReactive.value) {
    return 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium';
  }

  return 'bg-white border-gray-300 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium';
};

useHead({
  title: 'Latest Crypto News | Encrypteer.com',
  charset: 'utf-8',
  lang: 'en',
  meta: [
    { name: 'description', content: 'Find all the latest crypto news, sorted by date, here. Read more!' },
  ],
});
</script>
