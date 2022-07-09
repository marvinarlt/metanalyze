<script setup lang="ts">
  import { ArrowRightIcon } from 'vue-tabler-icons';
</script>

<template>
  <div class="page-not-found centered-component">
    <img class="not-found-image" src="/assets/images/obi-wan-kenobi.gif" alt="Not Found">
    <h1><span>Page not found</span> "This is not the page you're looking for"</h1>
    <p>Maybe you have a typo in the url or you just clicked on a link that doesn't exists anymore. Check your url or visit the homepage.</p>
    <RouterLink class="button" to="/" title="Back to homepage">Back to homepage <ArrowRightIcon /></RouterLink>
  </div>
</template>
