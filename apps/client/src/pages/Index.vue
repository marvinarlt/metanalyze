<script setup lang="ts">
  import Tabs from '@app/components/Tabs.vue';
  import Tab from '@app/components/Tab.vue';
  import TheUrlTab from '@app/components/TheUrlTab.vue';
  import TheSnippetTab from '@app/components/TheSnippetTab.vue';
</script>

<template>
  <div class="page-index centered-component">
    <Tabs>
      <Tab label="pages.index.url.label">
        <TheUrlTab />
      </Tab>
      <Tab label="pages.index.snippet.label">
        <TheSnippetTab />
      </Tab>
    </Tabs>
  </div>
</template>