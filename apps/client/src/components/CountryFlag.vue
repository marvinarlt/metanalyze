<script setup lang="ts">
  defineProps<{
    locale: string
  }>();
</script>

<template>
  <img
    class="country-flag"
    :src="`/assets/flags/${ locale }.svg`"
    :alt="$t(`flag-icons.${ locale }`)"
  >
</template>