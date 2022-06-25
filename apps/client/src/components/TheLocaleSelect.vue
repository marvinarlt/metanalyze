<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDownIcon } from 'vue-tabler-icons';
import { useI18n } from '@app/composables/i18n';
import CountryFlag from '@app/components/CountryFlag.vue';

const { setLocale } = useI18n();
const isOpen = ref(false);

const toggleDropDown = () => {
  isOpen.value = ! isOpen.value;
}

const selectLocale = (locale: string) => {
  setLocale(locale);
  isOpen.value = false;
}
</script>

<template>
  <div :class="{ 'locale-select': true, 'is-open': isOpen }">
    <div class="locale-select-button" @click.prevent="toggleDropDown">
      <span class="locale-select-button-flag locale-select-flag">
        <CountryFlag :locale="$i18n.locale" />
      </span>
      <span class="locale-swticher-button-label">{{ $t(`locales.${ $i18n.locale }`) }}</span>
      <span class="locale-select-button-icon">
        <ChevronDownIcon />
      </span>
    </div>
    <ul class="locale-select-list">
      <template v-for="availableLocale in $i18n.availableLocales" :key="availableLocale">
        <li
          :class="{ 'locale-select-list-item': true, 'current': $i18n.locale == availableLocale }"
          :title="$t(`locales.${ availableLocale }`)"
          @click.prevent="selectLocale(availableLocale)"
        >
          <span class="locale-select-list-item-icon locale-select-flag">
            <CountryFlag :locale="availableLocale" />
          </span>
          <span class="locale-select-list-item-label">{{ $t(`locales.${ availableLocale }`) }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>