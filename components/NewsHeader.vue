<template>
  <header class="relative bg-white overflow-hidden">
    <div
      class="hidden lg:block lg:absolute lg:inset-0"
      aria-hidden="true"
    >
      <svg
        class="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
        width="640"
        height="784"
        fill="none"
        viewBox="0 0 640 784"
      >
        <defs>
          <pattern
            id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
            x="118"
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
        <rect
          y="72"
          width="640"
          height="640"
          class="text-gray-50"
          fill="currentColor"
        />
        <rect
          x="118"
          width="404"
          height="784"
          fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
        />
      </svg>
    </div>

    <div class="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
      <main class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <NuxtLink :to="link" class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span class="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">Newest Crypto News Article</span>
              <span
                class="mt-1 block tracking-tight font-bold sm:tracking-tight xl:tracking-tight"
                :class="headlineCssClass"
              >
                <span class="block text-indigo-700">{{ newestArticle.title }}</span>
              </span>
            </h1>
            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              {{ trimmedSummary }}
            </p>
            <p class="mt-8 text-gray-400 text-md">
              {{ publishTime }}
            </p>
            <p class="mt-3 block text-base font-semibold text-indigo-700 sm:text-lg lg:text-base xl:text-lg">
              Read More!
            </p>
          </NuxtLink>
          <div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <svg
              class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
              width="640"
              height="784"
              fill="none"
              viewBox="0 0 640 784"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                  x="118"
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
              <rect
                y="72"
                width="640"
                height="640"
                class="text-gray-50"
                fill="currentColor"
              />
              <rect
                x="118"
                width="404"
                height="784"
                fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
              />
            </svg>
            <div
              class="relative mx-auto w-full lg:max-w-md"
              :class="{ 'rounded-lg shadow-lg': hasOwnImage }"
            >
              <NuxtLink
                :to="link"
                class="relative block w-full rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :class="{ 'bg-white': hasOwnImage }"
              >
                <nuxt-img
                  class="w-full"
                  :src="articleImage"
                  :alt="newestArticle.title"
                >
                  <span
                    class="absolute inset-0 w-full h-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-20 w-20 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 84 84"
                    >
                      <circle
                        opacity="0.9"
                        cx="42"
                        cy="42"
                        r="42"
                        fill="white"
                      />
                      <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                    </svg>
                  </span>
                </nuxt-img>
              </NuxtLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  </header>
</template>

<script setup lang="ts">
import slugify from '@/helpers/slugify';
import { PropType, toRefs, computed } from 'vue';
import { NewsEntry } from '@/types/news';
import moment from 'moment';

const props = defineProps({
  newestArticle: {
    type: Object as PropType<NewsEntry>,
    required: true,
  },
});

const { newestArticle } = toRefs(props);

// trim summary after second sentence
const trimmedSummary = computed(() => {
  const { summary } = newestArticle.value;
  const index = summary.indexOf('.', summary.indexOf('.') + 1);
  return index > 0 ? summary.substring(0, index + 1) : summary;
});

const articleImage = computed(() => {
  if (newestArticle.value.s3_image_url && newestArticle.value.s3_image_url.includes('"')) {
    return newestArticle.value.s3_image_url.replace(/"/g, '');
  }
  if (newestArticle.value.s3_image_url) {
    return newestArticle.value.s3_image_url;
  }
  return 'icon.png';
});

const hasOwnImage = computed(() => {
  if (newestArticle.value.s3_image_url && newestArticle.value.s3_image_url.includes('"')) {
    return true;
  }
  if (newestArticle.value.s3_image_url) {
    return true;
  }
  return false;
});

const headlineCssClass = computed(() => {
  if (newestArticle.value.title.length > 50) {
    return 'text-2xl sm:text-3xl xl:text-4xl';
  }
  return 'text-4xl sm:text-5xl xl:text-6xl';
});

const publishTime = computed(() => moment(newestArticle.value.publish_timestamp).format('MMM DD, YYYY h:mm a'));

const slug = computed(() => slugify(newestArticle.value.title));

const link = computed(() => `/news/${slug.value}/${newestArticle.value.id}`);

</script>
