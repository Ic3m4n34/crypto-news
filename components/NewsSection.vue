<template>
  <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 news-section">
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
          <slot name="headline" />
        </h2>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          <slot name="description" />
        </p>
      </div>
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <NewsDisplayTile
          v-for="article in articles"
          :key="article.id"
          :article="article"
          :tag="tag"
        />
      </div>
      <div class="text-center mt-12">
        <slot name="call-to-action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType,
} from 'vue';
import { NewsEntry } from '@/types/news';

export default defineComponent({
  props: {
    articles: {
      type: Array as PropType<NewsEntry[]>,
      required: true,
    },
    tag: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
