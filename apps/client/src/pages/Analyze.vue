<script setup lang="ts">
  import { computed } from 'vue';
  import { analyzeStore } from '@app/stores/analyze';
  import ProgressBar from '@app/components/ProgressBar.vue';

  const progress = computed(() => {
    return analyzeStore.state.crawledPages / analyzeStore.state.foundPages || 0;
  });
</script>

<template>
  <div class="page-analyze">
    <ProgressBar :value="progress" />
    <div class="information">
      <p class="information-page">{{ analyzeStore.state.lastCrawledPage || $t('pages.analyze.search-meta-data') }}</p>
      <p class="information-amount">
        <span class="information-amount-current">{{ analyzeStore.state.crawledPages }}</span>
        <span class="information-amount-split">/</span>
        <span class="information-amount-total">{{ analyzeStore.state.foundPages }}</span>
      </p>
    </div>
  </div>
</template>