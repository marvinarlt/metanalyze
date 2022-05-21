<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import DefaultLayout from '@app/layouts/DefaultLayout.vue';

const router = useRouter();
const i18n = useI18n();
const layoutComponent = computed(() => router.currentRoute.value.meta?.layout || DefaultLayout);

watch(i18n.locale, () => {
  console.log('Locale updated: ', i18n.locale);
});
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
