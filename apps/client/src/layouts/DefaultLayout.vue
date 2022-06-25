<script setup lang="ts">
import TheLocaleSelect from '@app/components/TheLocaleSelect.vue';

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="layout-default">
    <div class="navigation">
      <RouterLink class="navigation-branding" to="/" :title="$t('navigation.home.title')">
        <img class="navigation-branding-image" src="/assets/images/branding.svg" :alt="$t('branding.alt')">
      </RouterLink>
      <div class="navigation-tools">
        <TheLocaleSelect />
      </div>
    </div>
    <main>
      <slot></slot>
    </main>
    <footer class="footer">
      <small class="footer-copyright">&copy; Copyright {{ currentYear }}, Metanalyze</small>
      <ul class="footer-navigation">
        <li class="footer-navigation-item">
          <RouterLink class="footer-navigation-link" to="/imprint" :title="$t('navigation.imprint.title')">{{ $t('navigation.imprint.label') }}</RouterLink>
        </li>
        <li class="footer-navigation-item">
          <RouterLink class="footer-navigation-link" to="/privacy-policy" :title="$t('navigation.privacy-policy.title')">{{ $t('navigation.privacy-policy.label') }}</RouterLink>
        </li>
      </ul>
    </footer>
  </div>
</template>