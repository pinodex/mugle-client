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
@import @/assets/sass/commons.sass

p
  margin-bottom: 1rem
  text-align: center

  +mobile
    color: $white
</style>
