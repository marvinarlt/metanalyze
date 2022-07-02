<script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSocket } from '@app/composables/socket';
  import DefaultLayout from '@app/layouts/DefaultLayout.vue';
  import Notifications from '@app/components/Notifications.vue';

  const socket = useSocket();
  const router = useRouter();
  const layoutComponent = computed(() => router.currentRoute.value.meta?.layout || DefaultLayout);

  socket.connect();
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
  <Notifications />
</template>
