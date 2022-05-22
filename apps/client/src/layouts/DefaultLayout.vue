<script setup lang="ts">
import TheLocaleSwitcher from '@app/components/TheLocaleSwitcher.vue';
</script>

<template>
  <div class="navigation">
    <RouterLink class="navigation-branding" to="/">
      <img class="navigation-branding-image" src="" alt="">
    </RouterLink>
    <TheLocaleSwitcher />
  </div>
  <slot></slot>
</template>