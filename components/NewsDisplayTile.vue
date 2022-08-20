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
        <p
          v-if="capitalizedTag.length > 0"
          class="text-sm font-medium text-indigo-600"
        >
          <NuxtLink
            :to="categoryLink"
            class="hover:underline"
          >
            {{ capitalizedTag }}
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
            <span v-if="article.readingTime"> {{ article.readingTime }}min read </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import slugify from '@/helpers/slugify';
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
      default: '',
    },
  },
  setup(props) {
    const { article, tag } = toRefs(props);

    const articleTags = computed(() => {
      if (!article.value.tags) return [];
      return article.value.tags;
    });

    const firstArticleTag = computed(() => {
      if (!articleTags.value.length) return null;
      return articleTags.value[0];
    });

    const articleLink = computed(() => `/news/${slugify(article.value.title)}/${article.value.id}`);
    const categoryLink = computed(() => {
      if (tag.value.length > 0) return `/news/tag/${tag.value}`;
      return `/news/tag/${firstArticleTag.value.toLowerCase()}`;
    });
    const publishTime = computed(() => moment(article.value.publish_timestamp).format('MMM DD, YYYY h:mm a'));
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

    const capitalizedTag = computed(() => {
      if (tag.value) {
        return capitalizeFirstLetter(tag.value.replace(/-/g, ' '));
      }
      if (!firstArticleTag.value) return '';
      return capitalizeFirstLetter(firstArticleTag.value);
    });

    return {
      articleDescription,
      articleImage,
      articleLink,
      categoryLink,
      capitalizedTag,
      publishTime,
    };
  },
});
</script>

<style scoped>

</style>
