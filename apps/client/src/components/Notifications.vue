<script setup lang="ts">
  import { useNotification } from '@app/composables/notification';
  import Notification from '@app/components/Notification.vue';

  const { notifications } = useNotification();
</script>

<template>
  <div class="notifications">
    <TransitionGroup name="notification">
      <Notification
        v-for="{ id, type, title, body } in notifications"
        :key="id"
        :type="type"
        :title="title"
        :body="body"
      />
    </TransitionGroup>
  </div>
</template>