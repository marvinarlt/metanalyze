<template>
  <div class="analyze-layout">
    <div class="centered-component">
      <header class="branding">
        <img class="branding-item" src="/assets/images/branding.svg" :alt="$t('branding.alt')">
      </header>
      <main class="main">
        <slot></slot>
      </main>
    </div>
  </div>
</template>