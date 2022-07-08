<script setup lang="ts">
  import { ref, Ref, watch, onBeforeMount } from 'vue';

  const props = defineProps<{
    value: number
  }>();

  const progressBar: Ref<HTMLElement | undefined> = ref(undefined);

  const updateProgressBar = () => {
    if (progressBar.value) {
      progressBar.value.style.width = `${ props.value * 100 }%`;
    }
  }

  onBeforeMount(updateProgressBar);
  watch(props, updateProgressBar);
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar-inner" ref="progressBar"></div>
  </div>
</template>