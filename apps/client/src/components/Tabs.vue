<script setup lang="ts">
import { useSlots, ref, provide } from 'vue';

const slots = useSlots();
const defaultSlot = slots.default();
const labels = ref(defaultSlot.map((tab) => tab.props.label));
const selectedLabel = ref(labels.value[0]);
const activeIndicator = ref(null);

provide('selectedLabel', selectedLabel);

const selectTab = (event: MouseEvent, label: string) => {
  selectedLabel.value = label;
  updateIndicator(event.target);
}

const updateIndicator = (labelItem: any) => {
  if (null === activeIndicator.value) {
    return;
  }

  activeIndicator.value.style.width = `${ labelItem.clientWidth }px`;
  activeIndicator.value.style.left = `${ labelItem.offsetLeft }px`;
}

const setIndicator = (event: any, label: string) => {
  if (selectedLabel.value !== label) {
    return;
  }

  updateIndicator(event.el);
}
</script>

<template>
  <div class="tabs">
    <div class="tabs-header">
      <div class="tabs-header-wrapper">
        <ul class="tabs-labels">
          <template v-for="label in labels" :key="label">
            <li class="tabs-labels-item" @click="selectTab($event, label)" @vnode-mounted="setIndicator($event, label)">{{ label }}</li>
          </template>
        </ul>
        <div class="tabs-active-indicator" ref="activeIndicator"></div>
      </div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>