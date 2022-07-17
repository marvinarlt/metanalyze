<script setup lang="ts">
  import TheSidebar from '@app/components/TheSidebar.vue';
</script>

<template>
  <div class="layout-dashboard">
    <TheSidebar />
    <div class="page-wrapper">
      <slot></slot>
    </div>
  </div>
</template>