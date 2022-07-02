<script setup lang="ts">
  import { ref } from 'vue';
  import { ArrowRightIcon } from 'vue-tabler-icons';

  const snippet = ref('');

  const startSnippetCheck = () => {
    console.log(snippet.value);
  }
</script>

<template>
  <form class="form" @submit.prevent="startSnippetCheck">
    <textarea class="textarea" name="snippet" :placeholder="$t('pages.index.snippet.placeholder')" required v-model="snippet"></textarea>
    <button class="button align-right" type="submit">{{ $t('pages.index.snippet.submit') }} <ArrowRightIcon /></button>
  </form>
</template>