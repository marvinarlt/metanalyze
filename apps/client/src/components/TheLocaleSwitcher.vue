<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDownIcon } from 'vue-tabler-icons';
import CountryFlag from '@app/components/CountryFlag.vue';

const isOpen = ref(false);
</script>

<template>
  <div :class="{ 'locale-switcher': true, 'is-open': isOpen }">
    <div class="locale-switcher-button" @click.prevent="isOpen = ! isOpen">
      <span class="locale-switcher-button-flag locale-switcher-flag">
        <CountryFlag :locale="$i18n.locale" />
      </span>
      <span class="locale-swticher-button-label">{{ $t(`locales.${ $i18n.locale }`) }}</span>
      <span class="locale-switcher-button-icon">
        <ChevronDownIcon />
      </span>
    </div>
    <ul class="locale-switcher-list">
      <template v-for="availableLocale in $i18n.availableLocales" :key="availableLocale">
        <li
          :class="{ 'locale-switcher-list-item': true, 'current': $i18n.locale == availableLocale }"
          :title="$t(`locales.${ availableLocale }`)"
          @click.prevent="$i18n.locale = availableLocale"
        >
          <span class="locale-switcher-list-item-icon locale-switcher-flag">
            <CountryFlag :locale="availableLocale" />
          </span>
          <span class="locale-switcher-list-item-label">{{ $t(`locales.${ availableLocale }`) }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>