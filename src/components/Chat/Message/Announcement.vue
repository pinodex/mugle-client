<template>
  <p>{{ content }}</p>
</template>

<script>
import BaseMessage from './BaseMessage.vue';

export default {
  extends: BaseMessage,
};
</script>

<style lang="sass" scoped>
p
  margin-bottom: 1rem
  text-align: center
</style>
