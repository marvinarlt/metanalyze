<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import { ArrowRightIcon, CheckIcon } from 'vue-tabler-icons';
  import { useValidation } from '@app/composables/validation';
  import { useAnalyze } from '@app/composables/analyze';
  import FormError from '@app/components/FormError.vue';

  const { isUrl } = useValidation();
  const analyze = useAnalyze();

  const errors: Ref<string[]> = ref([]);
  const url: Ref<string> = ref('');
  const shouldCrawl: Ref<boolean> = ref(false);

  const startUrlCheck = () => {
    if (! isUrl(url.value)) {
       errors.value.push('invalid-url');
       return;
    }

    const urlInstance = new URL(url.value);
    const normalizedUrl = urlInstance.origin + urlInstance.pathname;

    analyze.url(normalizedUrl, shouldCrawl.value);
  }
</script>

<template>
  <form class="form" @submit.prevent="startUrlCheck">
    <FormError :errors="errors" />
    <input class="input" type="url" name="url" :placeholder="$t('pages.index.url.placeholder')" required v-model="url">
    <input class="checkbox-input" type="checkbox" name="crawl" id="crawl" v-model="shouldCrawl">
    <label class="checkbox" for="crawl">
      <span class="checkbox-element">
        <CheckIcon class="checkbox-icon" />
      </span>
      <span class="checkbox-label">{{ $t('pages.index.url.checkbox') }}</span>
    </label>
    <button class="button align-right" type="submit">{{ $t('pages.index.url.submit') }} <ArrowRightIcon /></button>
  </form>
</template>