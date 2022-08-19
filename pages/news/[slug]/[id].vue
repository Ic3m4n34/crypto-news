<template>
  <div class="relative bg-white overflow-hidden news-detail-page">
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div class="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
        <svg class="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
        </svg>
        <svg class="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
        </svg>
        <svg class="absolute bottom-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="d3eb07ae-5182-43e6-857d-35c643af9034"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
        </svg>
      </div>
    </div>
    <div class="relative px-4 sm:px-6 lg:px-8">
      <div class="text-lg max-w-prose mx-auto">
        <h1>
          <NuxtLink
            v-if="capitalizedTag"
            class="block text-lg text-center text-indigo-600 font-semibold"
            :to="`/news/${tag}`"
          >
            {{ capitalizedTag }}
          </NuxtLink>
          <span class="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
            {{ headline }}
          </span>
        </h1>
        <div class="rounded-lg overflow-hidden my-8">
          <nuxt-img
            v-if="articleImage"
            :src="articleImage"
            :alt="headline"
          />
          <div
            v-else
            class="bg-indigo-600 text-white flex justify-center items-center aspect-square w-full object-cover text-center p-4"
          >
            <h3 class="font-bold text-3xl md:text-5xl">
              {{ headline }}
            </h3>
          </div>
        </div>
      </div>
      <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto" v-html="htmlContent" />
    </div>
    <div
      v-if="articleTags.length > 0"
    >
      <NewsSection
        :articles="moreNews"
        :tag="articleTags[0].toLowerCase()"
      >
        <template #headline>
          {{ capitalizedTag }} News
        </template>

        <template #description>
          Here are the latest <span class="font-bold">{{ capitalizedTag }}</span> news.
        </template>

        <template #call-to-action>
          <NuxtLink :to="`/news/tag/${tag}`" class="text-indigo-600 text-xl">
            For more <span class="font-bold">{{ capitalizedTag }}</span> News, click here!
          </NuxtLink>
        </template>
      </NewsSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalizeFirstLetter } from '@/lib/helpers';
import { computed } from 'vue';
import { NewsEntry } from '@/types/news';

const route = useRoute();
const { id } = route.params;

const { data: article } = await useAsyncData(`${id}-details`, () => $fetch<NewsEntry>(`/api/id/${id}`));

const articleTags = computed(() => {
  if (!article.value.tags) return [];
  return article.value.tags;
});

const { data: moreNews } = await useAsyncData(`${id}-more-news`, () => $fetch<NewsEntry[]>(`/api/tags/${articleTags.value[0].toLowerCase()}?limit=6`));

const headline = computed(() => article.value.title);

const summary = computed(() => article.value.summary);
const htmlContent = computed(() => article.value.html_content.replace(/\n/g, ''));

const articleImage = computed(() => {
  if (article.value.s3_image_url && article.value.s3_image_url.includes('"')) {
    return article.value.s3_image_url.replace(/"/g, '');
  }
  if (article.value.s3_image_url) {
    return article.value.s3_image_url;
  }
  return null;
});

const capitalizedTag = computed(() => {
  if (articleTags.value.length === 0) return null;
  return capitalizeFirstLetter(articleTags.value[0]);
});

useHead({
  title: `${headline.value} | Encrypteer.com`,
  charset: 'utf-8',
  lang: 'en',
  meta: [
    { name: 'description', content: summary.value },
  ],
});

</script>
