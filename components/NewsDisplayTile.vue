<template>
  <div
    class="flex flex-col rounded-lg shadow-lg overflow-hidden"
  >
    <div class="flex-shrink-0">
      <img
        class="h-48 w-full object-cover"
        :src="article.s3_image_url"
        alt=""
      >
    </div>
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
          <p class="text-xl font-semibold text-gray-900">
            {{ article.title }}
          </p>
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

    return {
      articleDescription,
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
