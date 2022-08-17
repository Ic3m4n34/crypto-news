<template>
  <div
    class="flex flex-col rounded-lg shadow-lg overflow-hidden"
  >
    <NuxtLink class="flex-shrink-0" :to="articleLink">
      <img
        v-if="articleImage"
        class="h-48 w-full object-cover"
        :src="articleImage"
        :alt="article.title"
      >
      <div
        v-else
        class="bg-indigo-600 text-white flex justify-center items-center h-48 w-full object-cover text-center p-4"
      >
        <h3 class="font-bold">
          {{ article.title }}
        </h3>
      </div>
    </NuxtLink>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <NuxtLink
            :to="categoryLink"
            class="hover:underline"
          >
            {{ capitalizeFirstLetter(tag) }}
          </NuxtLink>
        </p>
        <NuxtLink
          :to="articleLink"
          class="block mt-2"
        >
          <h2 class="text-xl font-semibold text-gray-900">
            {{ article.title }}
          </h2>
          <p class="mt-3 text-base text-gray-500">
            {{ articleDescription }}
          </p>
        </NuxtLink>
      </div>
      <div class="mt-6 flex items-center">
        <div class="ml-3">
          <div class="flex space-x-1 text-sm text-gray-500">
            <time :datetime="article.publish_timestamp">
              {{ publishTime }}
            </time>
            <span aria-hidden="true"> &middot; </span>
            <span> {{ article.readingTime }}min read </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import slugify from 'slugify';
import { defineComponent, computed, toRefs } from 'vue';
import { capitalizeFirstLetter } from '@/lib/helpers';
import moment from 'moment';

export default defineComponent({
  name: 'NewsDisplayTile',
  props: {
    article: {
      type: Object,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { article, tag } = toRefs(props);

    const articleLink = computed(() => `/news/${tag.value}/${slugify(article.value.title.toLowerCase())}/${article.value.id}`);
    const categoryLink = computed(() => `/news/${tag.value}`);
    const publishTime = computed(() => moment(article.value.publish_timestamp).format('MMM DD, YYYY'));
    const articleDescription = computed(() => `${article.value.summary.slice(0, 150)}...`);
    const articleImage = computed(() => {
      if (article.value.s3_image_url && article.value.s3_image_url.includes('"')) {
        return article.value.s3_image_url.replace(/"/g, '');
      }
      if (article.value.s3_image_url) {
        return article.value.s3_image_url;
      }
      return null;
    });

    return {
      articleDescription,
      articleImage,
      articleLink,
      categoryLink,
      capitalizeFirstLetter,
      publishTime,
    };
  },
});
</script>

<style scoped>

</style>
