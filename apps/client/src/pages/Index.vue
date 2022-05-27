<script setup lang="ts">
import { ArrowRightIcon, CheckIcon } from 'vue-tabler-icons';
import Tabs from '@app/components/Tabs.vue';
import Tab from '@app/components/Tab.vue';

const startUrlCheck = () => {
  // TODO: Validate URL
}

const startSnippetCheck = () => {

}
</script>

<template>
  <Tabs>
    <Tab label="URL">
      <form class="form" @submit.prevent="startUrlCheck">
        <input class="input" type="url" name="url" placeholder="https://www.example.com" required>
        <input class="checkbox-input" type="checkbox" name="crawl" id="crawl">
        <label class="checkbox" for="crawl">
          <span class="checkbox-element">
            <CheckIcon class="checkbox-icon" />
          </span>
          <span class="checkbox-label">Crawl complete website</span>
        </label>
        <button class="button" type="submit">Crawl webpage <ArrowRightIcon /></button>
      </form>
    </Tab>
    <Tab label="Snippet">
      <form class="form" @submit.prevent="startSnippetCheck">
        <textarea class="textarea" name="snippet" placeholder="Insert a HTML snippet" required></textarea>
        <button class="button" type="submit">Check snippet <ArrowRightIcon /></button>
      </form>
    </Tab>
  </Tabs>
</template>