<script setup lang="ts">
  defineProps<{
    type: 'info' | 'success' | 'warning' | 'error',
    title: string,
    body: string,
  }>();
</script>

<template>
  <div :class="`notification notification-${ type }`">
    <p class="notification-title"><strong>{{ $t(title) }}</strong></p>
    <p class="notification-body">{{ $t(body) }}</p>
  </div>
</template>