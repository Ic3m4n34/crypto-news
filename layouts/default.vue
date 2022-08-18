<template>
  <div class="layout--default">
    <MainNavigation />
    <main>
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  /* setup() {
    const nuxtApp = useNuxtApp();

    nuxtApp.hook('page:finish', () => {
      window.scrollTo(0, 0);
    });
  }, */
};
</script>
