<script setup lang="ts">
import { ref } from 'vue';
import { ArrowRightIcon, CheckIcon } from 'vue-tabler-icons';
import Tabs from '@app/components/Tabs.vue';
import Tab from '@app/components/Tab.vue';

const url = ref('');
const shouldCrawl = ref(false);
const snippet = ref('');

const startUrlCheck = () => {
  // TODO: Validate URL
  console.log(url.value, shouldCrawl.value);
}

const startSnippetCheck = () => {
  console.log(snippet.value);
}
</script>

<template>
  <div class="page-index">
    <Tabs>
      <Tab :label="$t('pages.index.url.label')">
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
      </Tab>
      <Tab :label="$t('pages.index.snippet.label')">
        <form class="form" @submit.prevent="startSnippetCheck">
          <textarea class="textarea" name="snippet" :placeholder="$t('pages.index.snippet.placeholder')" required v-model="snippet"></textarea>
          <button class="button align-right" type="submit">{{ $t('pages.index.snippet.submit') }} <ArrowRightIcon /></button>
        </form>
      </Tab>
    </Tabs>
  </div>
</template>