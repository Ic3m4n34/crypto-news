<template>
  <div class="layout--default">
    <NuxtLoadingIndicator :height="10" />
    <MainNavigation />
    <main>
      <slot />
    </main>
    <PageFooter />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
};
</script>
