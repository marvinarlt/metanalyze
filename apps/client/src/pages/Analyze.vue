<script setup lang="ts">
  import { computed } from 'vue';
  import { analyzeStore } from '@app/stores/analyze';
  import ProgressBar from '@app/components/ProgressBar.vue';

  const lastCrawledPage = computed(() => analyzeStore.state.lastCrawledPage);
  const crawledAmount = computed(() => analyzeStore.state.crawled.size);
  const internalAmount = computed(() => analyzeStore.state.internal.size);
  const progress = computed(() => crawledAmount.value / internalAmount.value || 0);
</script>

<template>
  <div class="page-analyze">
    <ProgressBar :value="progress" />
    <div class="information">
      <p class="information-page">{{ lastCrawledPage || $t('pages.analyze.search-meta-data') }}</p>
      <p class="information-amount">
        <span class="information-amount-current">{{ crawledAmount }}</span>
        <span class="information-amount-split">/</span>
        <span class="information-amount-total">{{ internalAmount }}</span>
      </p>
    </div>
  </div>
</template>