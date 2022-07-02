<script setup lang="ts">
  defineProps<{
    errors: string[]
  }>();
</script>

<template>
  <div v-show="0 < errors.length" class="form-error">
    <p class="form-error-paragraph">{{ $t('errors.paragraph') }}</p>
    <ul class="form-error-list">
      <li
        v-for="error, index in errors"
        :key="index"
        class="form-error-list-item"
      >{{ $t(`errors.${ error }`) }}</li>
    </ul>
  </div>
</template>