<script setup lang="ts">
  import { useNotifications } from '@app/composables/notifications';
  import Notification from '@app/components/Notification.vue';

  const { state } = useNotifications();
</script>

<template>
  <div class="notifications">
    <TransitionGroup name="notification">
      <Notification
        v-for="notification, index in state.notifications"
        :key="index"
        :type="notification.type"
        :title="notification.title"
        :body="notification.body"
      />
    </TransitionGroup>
  </div>
</template>