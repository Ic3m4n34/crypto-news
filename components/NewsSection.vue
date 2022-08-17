<template>
  <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 news-section">
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
          {{ headline }} News
        </h2>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Here are the latest <span class="font-bold">{{ headline }}</span> news.
        </p>
      </div>
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <NewsDisplayTile
          v-for="article in displayArticles"
          :key="article.id"
          :article="article"
          :tag="tag.tag"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, toRefs, PropType,
} from 'vue';
import { NewsEntry } from '@/types/news';
import { Tag } from '@/types/tags';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  props: {
    tag: {
      type: Object as PropType<Tag>,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const { tag } = toRefs(props);

    const fetchArticles = async () => {
      try {
        const { data: articles } = await useFetch(`/api/tags/${tag.value.tag}`);

        return articles.value;
      } catch (error) {
        console.error(`Error fetching news with ${tag.value.tag}`, error);
        return [];
      }
    };

    const articles = await fetchArticles();

    const displayArticles = computed((): NewsEntry[] => {
      if (articles && articles.length > 0) return articles.slice(0, 6);
      return [];
    });

    return {
      displayArticles,
      uuidv4,
    };
  },
});
</script>
