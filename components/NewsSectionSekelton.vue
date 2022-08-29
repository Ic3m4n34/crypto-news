<template>
  <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 news-section-skeleton min-h-screen">
    <div class="relative max-w-7xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl sm:tracking-tight">
          Bitcoin News
        </h2>
        <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Here are the latest Bitcoin news.
        </p>
      </div>
      <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none px-4">
        <div v-for="index in 3" :key="index" class="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div class="flex-shrink-0">
            <div
              class="bg-indigo-600 text-white flex justify-center items-center h-48 w-full object-cover text-center p-4 animate-pulse"
            />
          </div>
          <div class="flex-1 bg-white p-6 flex flex-col justify-between">
            <div class="flex-1">
              <p
                class="text-sm font-medium bg-indigo-600 h-4 w-2/12 animate-pulse"
              />
              <div
                class="block mt-4"
              >
                <div class="text-xl font-semibold bg-gray-900 w-full h-6 mb-2 animate-pulse" />
                <div class="text-xl font-semibold bg-gray-900 w-3/4 h-6 animate-pulse" />
                <p class="mt-3 text-base bg-gray-500 h-4 w-full animate-pulse" />
                <p class="mt-3 text-base bg-gray-500 h-4 w-full animate-pulse" />
                <p class="mt-3 text-base bg-gray-500 h-4 w-full animate-pulse" />
                <p class="mt-3 text-base bg-gray-500 h-4 w-1/4 animate-pulse" />
              </div>
            </div>
            <div class="mt-6 flex items-center">
              <div class="ml-3">
                <div class="flex space-x-1 text-sm text-gray-500 animate-pulse">
                  <span> ∞min read </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <slot name="call-to-action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">

</style>
