<script setup lang="ts">
  import { inject, computed, Ref } from 'vue';

  const props = defineProps<{
    label: string
  }>();

  const selectedLabel: Ref<string> | undefined = inject('selectedLabel');
  const isActive = computed(() => selectedLabel?.value === props.label);
</script>

<template>
  <div :class="{ 'tab': true, 'active': isActive }">
    <slot></slot>
  </div>
</template>