<script setup lang="ts">
  import { inject } from 'vue';

  defineProps<{
    label: string
  }>();

  const selectedLabel = inject('selectedLabel');
</script>

<template>
  <div class="tab" v-show="selectedLabel === label">
    <slot></slot>
  </div>
</template>