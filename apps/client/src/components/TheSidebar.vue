<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import { ArrowRightIcon, ExternalLinkIcon, FileIcon, UrgentIcon, TrafficConeIcon } from 'vue-tabler-icons';
  import { analyzeStore } from '@app/stores/analyze';

  const originUrl: Ref<string> = ref(analyzeStore.state.initialUrl);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-branding">
        <RouterLink class="sidebar-branding-wrapper" to="/dashboard" title="Dashboard">
          <img class="sidebar-branding-item" src="/assets/images/branding.svg" alt="">
        </RouterLink>
      </div>
      <div class="sidebar-quick-info">
        <ul class="sidebar-list">
          <li class="sidebar-list-item">
            <span class="sidebar-quick-info-icon">
              <ExternalLinkIcon />
            </span>
            <a class="sidebar-quick-info-label" :href="originUrl" title="" target="_blank">{{ originUrl }}</a>
          </li>
          <li class="sidebar-list-item">
            <span class="sidebar-quick-info-icon">
              <FileIcon />
            </span>
            <RouterLink to="/pages" class="sidebar-quick-info-label">14 pages</RouterLink>
          </li>
          <li class="sidebar-list-item error">
            <span class="sidebar-quick-info-icon">
              <UrgentIcon />
            </span>
            <RouterLink to="/errors" class="sidebar-quick-info-label">2 errors</RouterLink>
          </li>
          <li class="sidebar-list-item warning">
            <span class="sidebar-quick-info-icon">
              <TrafficConeIcon />
            </span>
            <RouterLink to="/warnings" class="sidebar-quick-info-label">5 warnings</RouterLink>
          </li>
        </ul>
      </div>
      <div class="sidebar-sitemap">
        <p class="sitemap-title">Sitemap</p>
        <ul class="sitemap">
          <li class="sitemap-item">index</li>
        </ul>
      </div>
    </div>
    <div class="sidebar-button">
      <button class="sidebar-button-item button" type="button">Create sitemap.xml <ArrowRightIcon /></button>
    </div>
  </div>
</template>