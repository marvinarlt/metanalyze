<script setup lang="ts">
  import { ref } from 'vue';
  import { ArrowRightIcon, CheckIcon } from 'vue-tabler-icons';

  const url = ref('');
  const shouldCrawl = ref(false);

  const startUrlCheck = () => {
    // TODO: Validate URL
    console.log(url.value, shouldCrawl.value);
  }
</script>

<template>
  <form class="form" @submit.prevent="startUrlCheck">
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