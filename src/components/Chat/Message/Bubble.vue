<template>
  <div
    class="message-container"
    :class="{
      'is-right': self
    }"
  >
    <div
      class="message"
      :class="{
        'has-background': self
      }"
    >
      <div class="message-body">
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMessage from './BaseMessage.vue';

export default {
  extends: BaseMessage,

  props: {
    self: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
.message-container
  margin-bottom: 1rem
  display: flex

  &.is-right
    justify-content: flex-end

.message
  max-width: 75%

  &.has-background
    background: linear-gradient(145deg, #26d0ce, #1a2980)

    .message-body
      padding: .5rem 1rem
      color: #fff

  .message-body
    border-width: 0
</style>
