<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDownIcon } from 'vue-tabler-icons';
import CountryFlag from '@app/components/CountryFlag.vue';

const i18n = useI18n();
const isOpen = ref(false);

const toggleDropDown = () => {
  isOpen.value = ! isOpen.value;
}

const selectLocale = (locale: string) => {
  i18n.locale.value = locale;
  isOpen.value = false;
}
</script>

<template>
  <div :class="{ 'locale-switcher': true, 'is-open': isOpen }">
    <div class="locale-switcher-button" @click.prevent="toggleDropDown">
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
          @click.prevent="selectLocale(availableLocale)"
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